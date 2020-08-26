/* TODO: DevDoc https://node-postgres.com/api/pool */

import config from "../config";

// npm install @types/pg
import { Pool } from 'pg';

const connectionData = {
    user: config.DATABASE_USER ,
    host: config.DATABASE_HOST,
    database: config.DATABASE_NAME ,
    password: config.DATABASE_PASSWORD ,
    port: Number(config.DATABASE_PORT),
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,    
  };

export const pool = new Pool(connectionData);


