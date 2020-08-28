//
// Configurar un servidor RELAY de correo
// Ref. https://kinsta.com/es/base-de-conocimiento/servidor-gratuito-smtp/
// Ref. https://www.youtube.com/watch?v=qaAlPWudD5I
//
import config from "../config"
import logger from './logger';

const transport = config.SMTP.transporter

export default async function sendEmail(type: string = "confirmation", params: any) {

    return new Promise((resolve, reject) => {
        const options = {
            from: {
                name: "Company Name",
                address: "no-reply@tester.es"
            },
            to: params.email,
            subject: "Subject",
            text: 'Please use a HTML compatible client to view this email',
            html: 'Email'
        }
    
        switch (type) {
            case "confirmation":
                options.subject = "Confirm your Email"
                options.text = `Use the following link to confirm your email \n ${params.link}`
                options.html = `
                    <html>
                        <body>
                            <h3>Company Name</h3>
                            <p>Use the following link to confirm your email <br> ${params.link}</p> 
                        </body>
                    </html>
                `
                break;
        
            default:
                break;
        }
    
        transport.sendMail(options, (err, any) => {
            if(err) {
                logger.error(`Error sending ${type} email to ${params.email}: ${err}`)
                return reject(err)
            } 

            resolve("Email sent")
        })
    })
}