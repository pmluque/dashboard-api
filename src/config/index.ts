/************************************************************
 * 
 * CONFIGURACIÓN
 * La configuracion se gestionar con este fichero y con el fichero .env
 * 
 * .env ----> config/index.ts ---> [ resto ficheros import config from '../config' ] --> config.PROPERTY
 * 
 */
import * as dotenv from "dotenv"
import { createTransport } from "nodemailer"
dotenv.config()


/*
SMTP
        Como configurar el servidor SMTP de Gmail
        Servidor SMTP: smtp.gmail.com.
        Usuarios SMTP: Tu usuario de Gmail, (Ejemplo: nombre@gmail.com)
        Contraseña SMTP: Tu contraseña de Gmail.
        Puerto SMTP: 587/465. SSL es el 465 y en caso de usar el TLS deberemos configurar el puerto por le 587.
        TLS/SSL: TLS/SSL.

        Ref. https://www.profesionalhosting.com/blog/cms/como-usar-el-servidor-smtp-de-gmail-gratis/
*/
const smtp = {
        HOST: process.env.SMTP_HOST   ,
        PORT: process.env.SMTP_PORT ,
        USERNAME: process.env.SMTP_USERNAME ,
        PASSWORD: process.env.SMTP_PASSWORD 
}


const transport = createTransport({
        host: smtp.HOST,
        port: Number(smtp.PORT),
        auth: {
            user: smtp.USERNAME,
            pass: smtp.PASSWORD
        }
})

/*
const transport = createTransport("SMTP" , {
        service: "Gmail",
        auth: {
            user: smtp.USERNAME,
            pass: smtp.PASSWORD
        }
})    
*/
export default {
        NODE_ENV: process.env.NODE_ENV ,
        APP_NAME: process.env.APP_NAME,
        PORT: process.env.PORT ,
        APP_DOMAIN: process.env.APP_DOMAIN ,
        DB_HOST: process.env.DB_HOST  ,    
        DB_PORT: process.env.DB_PORT  ,      
        DB_NAME: process.env.DB_NAME  ,
        DB_USER: process.env.DB_USER     ,
        DB_PASSWORD: process.env.DB_PASSWORD   ,
        SMTP: {
            options: smtp,
            transporter: transport
        },
        LOG_LEVEL: process.env.LOG_LEVEL

}