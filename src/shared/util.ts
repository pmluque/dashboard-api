import crypto from "crypto"
import logger from './logger';
import config from '../config'
import sendEmail from '../shared/sendEmail'

export async function generateSalt(){ 
    return crypto.randomBytes(16).toString("hex") 
} 

export async function sendConfirmationEmail(email: string) {
    const methodName='sendConfirmationEmail'

    generateSalt()
       .then( (uniqueCode) => {
         
           logger.debug(`${methodName} uniqueCode: ${uniqueCode}`)
           // Acceso al cliente REDIS 24h de vida 
           /*
           try{
               if( config.REDIS_CLIENT !== null && config.REDIS_CLIENT !== undefined ){
                  config.REDIS_CLIENT.setex(`confirmation_${email}`, 60*60*24, uniqueCode)
               }  
           }catch(error) {
               logger.error('Servicio REDIS indisponible' , error )
           } 
           */    

           // Composición del enlace que se incluirá en el cuerpo del correo para hacer la confirmación
           const link = `${config.APP_DOMAIN}/confirmemail?email=${email}&c=${uniqueCode}`
           try {
                sendEmail("confirmation", {
                   email: email,
                   link
               })
               logger.debug("Email sent")
           } catch(err) {
               logger.debug(`Error sending confirmation email to ${email}: ${err}`)
               throw new Error(`Error sending confirmation email to ${email}: ${err}`)
           }        

        } )
       .catch( (err) => {
           logger.debug(`Error sending generating unicode for ${email}: ${err}`)
           throw new Error(`Error sending generating unicode for ${email}: ${err}`)        
        
        })

 
}