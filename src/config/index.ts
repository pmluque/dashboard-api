import * as dotenv from "dotenv"
dotenv.config()
export default {
    NODE_ENV: process.env.NODE_ENV,
    APP_NAME: process.env.APP_NAME,
    PORT: process.env.PORT || 3000,
    DATABASE_HOST: process.env.DATABASE_HOST || '10.10.5.152' ,    
    DATABASE_PORT: process.env.DATABASE_PORT || 5432 ,      
    DATABASE_NAME: process.env.DATABASE_NAME || 'scstats' ,
    DATABASE_USER: process.env.DATABASE_USER || 'test'    ,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'test'    
}