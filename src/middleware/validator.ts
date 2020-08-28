// Ref. https://joi.dev/api/?v=17.2.1
import {Request, Response, NextFunction} from "express"
import Joi from "joi"
import logger from '../shared/logger';
import { codes } from '../database/codes';


const insertSchema = Joi.object().keys({
    "username": Joi.string().min(6).required(),
    "password": Joi.string().min(5).max(128).required(),
    "name": Joi.string().required(),
    "email": Joi.string().email().required()    
})

export function insertValidator(req: Request, res: Response, next: NextFunction) {
    const methodName = 'validator.insert';
    const result = insertSchema.validate(req.body)

    if(result.error !== null && result.error !== undefined ) {

        logger.error( methodName , result.error);
        return res.status(400).json( {
          ok: false,
          error: {
              code: codes["UNSUCCESSFUL VALIDATION"] ,
              message: result.error
          },
          message:`Los datos no cumples las restricciones`
         });  
    }

    next()
}