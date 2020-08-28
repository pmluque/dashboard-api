/* TODO: DevDoc https://node-postgres.com/api/pool */
import logger from '../shared/logger';
import config from "../config";

// npm install @types/pg
import { Pool } from 'pg';

const connectionData = {
    user: config.DB_USER ,
    host: config.DB_HOST,
    database: config.DB_NAME ,
    password: config.DB_PASSWORD ,
    port: Number(config.DB_PORT),
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,  
    statement_timeout: 10000  
  };



export const pool = new Pool(connectionData);

pool.on('error', function (err) {
  logger.error('Database error :', err);
});  

// Schema
// Declare a constant for the CRUD Postgres table
const tableName = "sc_users";
// Declare a string for the CREATE TABLE SQL statement
const createSql = `CREATE TABLE  IF NOT EXISTS ${config.DB_USER}.${tableName} (
    username character varying(100) COLLATE pg_catalog."default" NOT NULL,
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    password character varying(100) COLLATE pg_catalog."default" NOT NULL,
    token character varying(100) COLLATE pg_catalog."default",
    status character varying(10) COLLATE pg_catalog."default" NOT NULL DEFAULT 'locked'::character varying,
    date_created timestamp with time zone NOT NULL DEFAULT now(),
    date_modified timestamp with time zone,
    created_by character varying(100) COLLATE pg_catalog."default" NOT NULL DEFAULT 'api'::character varying,
    modified_by character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT users_pk PRIMARY KEY (username)
    )
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;
    
    ALTER TABLE ${config.DB_USER}.sc_users
        OWNER to ${config.DB_USER};`;

async function createTable() {

    pool.connect((err, client, release) => {
    if (err) {
      return logger.error('DB Error acquiring client', err.stack);
    }
    logger.info('Database successfully pool initialized');

    client.query(createSql, (err, result) => {
      release();
      if (err) {
        return console.error('Error executing query', err.stack);
      }
      logger.debug(`Table ${tableName} successful : ${result}`);
    });
  });
} 

// createTable();
