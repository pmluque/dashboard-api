import * as argon2 from "argon2"
import crypto from "crypto"
import uuid from "uuid"
import config from "../config"

import { User } from "../models/user.model"

export class AuthService {
    constructor() {}

    /**
    register: registra usuarios en una tabla genérica
    Tabla: sc_uses
        username character varying(100)NOT NULL,
        password character varying(100)NOT NULL,        
        name character varying(100) NOT NULL,
        status character varying(10) DEFAULT 'locked',        
        token character varying(100) ,
        isUserConfirmed BOOLEAN DEFAULT FALSE,
        date_created timestamp with time zone NOT NULL DEFAULT now(),
        date_modified timestamp with time zone,
        created_by character varying(100) COLLATE pg_catalog."default" NOT NULL DEFAULT 'api'::character varying,
        modified_by character varying(100) COLLATE pg_catalog."default"

    Package for security: npm i argon2 uuid
       You can read about argon2 here, it is a one-way cryptographic hashing algorithm that makes brute force, 
       timing attacks and dictionary attacks more difficult, OWASP suggests using argon2 instead of other hashing 
       algorithms like bcrypt in modern applications.    
    */
    public async register(name: string, username: string, password: string) { 
        /*
        const doesUserExist = await User.findOne({ email: email })
        if(doesUserExist.username === username) throw new Error("User is already registered");
        */
    }

    /**
     * confirmEmail
     * It will check if the email exists and if the received token matches the token stored in Redis, 
     * if satisfied, it updates the `isUserConfirmed` column for that user in the table.
     * 
     * @param email 
     * @param code : unicode para el reconocimiento del email
     */
    confirmEmail(email: string, code: string) {}
}