
import { request, Request, Response } from "express";
import config from '../config'
import logger from '../shared/logger';
import { pool  } from '../database/postgres';
import { sql } from '../database/query';
import { codes } from '../database/codes';
import { contentSecurityPolicy } from "helmet";
import * as argon2 from "argon2"
import crypto from 'crypto'
import * as util from '../shared/util'
// -- Utilidad de envio de correo
import sendEmail from "../shared/sendEmail";


export class UserController {

  // Services

  /**
   * findAll
   * GET /api/users
   * @param req 
   * @param res 
   */
  public async findAll(req: Request, res: Response) {
    const methodName = 'findAll';
    // Params
    // const body = req.body;
    // Payload
    /*
    let user = {
        username : body.username ,
        name: body.name ,
        //password : bcrypt.hashSync( body.password, 10 )   
        password: body.password   
    };
    */
   pool.connect( (err, client, release ) => {

    if( err ) {
      logger.error( methodName , err)
      return res.status(400).json( {
        ok: false,
        error: {
            code: codes["DATABASE SERVICE ERROR"] ,
            message: 'Connection terminated due to connection timeout'
        },
        message:`No returned data from ${methodName}`
       });
    }

    // 1. realizo la consulta de todos los registros
    client.query( sql["user.findAll"] , (error, results) => {
      release(); // liberar conexión
      if (error) {

        logger.error( methodName , error);
        return res.status(400).json( {
          ok: false,
          error: {
              code: codes["BAD REQUEST"] ,
              message: error
          },
          message:`No returned data from ${methodName}`
         });

      }

      logger.debug( methodName , 'OK');
      const resp = {
        ok: true,
        data: {
            users: results.rows
        },
        message:`Returned data from ${methodName}`
      };

      res.status(200).json(resp);
     }) // fin query 1
    }) // fin conexion pool   

  }

  /**
   * findOne
   * GET /api/users/:username
   * @param req 
   * @param res 
   */
  public async findOne(req: Request, res: Response) {
    const methodName = 'findOne';
    // Params
    // Ej. const id = parseInt(request.params.id)
    let username = req.params.username;
    logger.info(`username : ${username}`);

    pool.query( sql["user.findOne"] , [username] , (error, results) => {
  
      if (error) {
  
        logger.error( methodName , error);
        return res.status(400).json( {
          ok: false,
          error: {
              code: codes["BAD REQUEST"] ,
              message: error
          },
          message:`No returned data from ${methodName}`
         });
  
      }
  
      if ( results.rows.length === 0){
  
        logger.warn( methodName , `${username} not exists`);
        return res.status(400).json( {
          ok: false,
          error: {
              code: codes["NOT FOUND"] ,
              message: `${username} not exists`
          },
          message:`No returned data from ${methodName}`
         });
  
      }
  
      logger.debug( methodName , 'OK');
      const resp = {
        ok: true,
        data: {
            user: results.rows[0]
        },
        message:`Returned data from ${methodName}`
    };
  
      res.status(200).json(resp); 
   })      

  } 
  
  /**
   * insert
   * POST /api/users
   * @param req 
   * @param res 
   * 
   * TestCase - name:Silvia , username: silvia@gmail.com , password: Silvia123
   * Ref. Cómo verificar la password
      await argon2.verify( passwordHashed , user.password ).then(() => { 
          console.log('Successful password supplied!');
          // TODO: log the user in
      }).catch(() => {
         console.log('Invalid password supplied!');
      });

   */
  public async insert(req: Request, res: Response) {
    const methodName = 'insert';

    // Query
    // Params
    //   Ej. const id = parseInt(request.params.id)
    // Body
    const user = { 
        name: req.body.name.trim() , 
        username: req.body.username.trim(),
        password: req.body.password.trim(),
        salt:''
    };

    logger.debug('user:', user );

    // 1. Comprobar que no existe 

    pool.query( sql["user.findOne"] , [user.username] , (error, results) => {
  
      if (error) {
          logger.error( methodName , error);
          return res.status(400).json( {
            ok: false,
            error: {
                code: codes["BAD REQUEST"] ,
                message: error
            },
            message:`No returned data from ${methodName}`
           });    
      }
    
      if ( results.rows.length !== 0) {
        // Ya está registrado
        return res.status(400).json( {
          ok: false,
          error: {
              code: codes["UNSUCCESSFUL PRE-INSERT"] ,
              message: `${user.username} already exists`
          },
          message:`No returned data from ${methodName}`
         });
      }

        // 2. Insertar el nuevo registro
    
        // ----- Cifrar la password
        // ----- Ref. https://stormpath.com/blog/secure-password-hashing-in-node-with-argon2
        let uniqueCode = '' 
        util.generateSalt()
          .then( (salt: string) => {
            uniqueCode = salt
             logger.debug(`${methodName} uniqueCode: ${uniqueCode}`)
            
             argon2.hash( uniqueCode + user.password)
             .then( hash => {  
                 
                   user.password = hash;
                   logger.debug(`Nueva password: ${user.password}` );
               
                   // 2. Insertamos registro
                   pool.query( sql["user.insert"] , [user.name, user.username, user.password , ] , (error, results) => {
               
                     if (error) {
               
                       logger.error( methodName , error);
                       return res.status(400).json( {
                         ok: false,
                         error: {
                             code: codes["BAD REQUEST"] ,
                             message: error
                         },
                         message:`No returned data from ${methodName}`
                        });
               
                     }
                     // Devolver respuesta
                     const resp = {
                       ok: true,
                       data: {
                           user: results.rows[0]
                       },
                       message:`Returned data from ${methodName}`
                     };
   
                     // 3. Enviar correo para confirmación
                     util.sendConfirmationEmail( user.username.trim())
       
                     // -----------------------------------------------
                     
                     return res.status(200).json(resp);
               })                           
                // fin query2   
             })
             .catch( (err) => {
               logger.error( methodName , err);
               return res.status(400).json( {
                 ok: false,
                 error: {
                     code: codes["UNSUCCESSFUL FUNCTION"],
                     message: err
                 },
                 message:`No returned data from ${methodName}`
                });    
             }) // fin argon2

            } ) // fin then generateSalt
          .catch( (err) => {
            logger.debug(`Error generating unicode for ${user.username}: ${err}`)
            throw new Error(`Error generating unicode for ${user.username}: ${err}`) 
          } )   // fin catch generateSalt      
    }) // fin query 1 
  }// fin insert 

  public async delete(req: Request, res: Response) {
    const methodName = 'delete';
 
    // Query
    // Params
    let username = req.params.username;
    logger.debug(`username : ${username}`);
    // Body

    // 1. Comprobar que no existe 
    pool.query( sql["user.findOne"] , [username] , (error, results) => {
  
      if (error) {
          logger.error( methodName , error);
          return res.status(400).json( {
            ok: false,
            error: {
                code: codes["BAD REQUEST"] ,
                message: error
            },
            message:`No returned data from ${methodName}`
           });    
      }

      if ( results.rows.length == 0) {
        // Ya está registrado
        return res.status(400).json( {
          ok: false,
          error: {
              code: codes["UNSUCCESSFUL PRE-DELETE"] ,
              message: `${username} doesn't exist !`
          },
          message:`No returned data from ${methodName}`
         });
      }

      // 2. Delete registro
    
      // ----- Cifrar la password
      // ----- Ref. https://stormpath.com/blog/secure-password-hashing-in-node-with-argon2
      pool.query( sql["user.delete"] , [username] , (error, results) => {
      
            if (error) {
      
              logger.error( methodName , error);
              return res.status(400).json( {
                ok: false,
                error: {
                    code: codes["BAD REQUEST"] ,
                    message:error
                },
                message:`No returned data from ${methodName}`
               });
      
            }
            // Devolver respuesta
            const resp = {
              ok: true,
              data: {
                  user: username
              },
              message:`Delete record using ${methodName}`
          };
      
            return res.status(200).json(resp);
          })          
        
       // fin query2   
   
   }) // fin query 1 
  }// fin delete 
  



}// fin controlador

