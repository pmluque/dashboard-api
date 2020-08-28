import crypto from "crypto"
import logger from './logger';
import config from '../config'
import sendEmail from '../shared/sendEmail'

export async function generateSalt(){ 
    return crypto.randomBytes(16).toString("hex") 
} 

export async function sendConfirmationEmail(email: string) {
    const methodName='sendConfirmationEmail'
    logger.debug(`${methodName} entro en sendConfirmationEmail ...`)
    let uniqueCode = ''
    generateSalt()
       .then( (salt) => {
           uniqueCode = salt
           logger.debug(`${methodName} uniqueCode: ${uniqueCode}`)
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