import Server from './server/server';
import logger from './shared/logger';

const server = Server.instance;
server.start( ()=> {
    logger.info(`Server started on ${server.port}`);
});



/* v.0
import express from "express"
import * as bodyParser from "body-parser";
import compression from "compression"
import helmet from "helmet"
import morgan from "morgan"
import logger from './shared/logger';
import cors from 'cors';

import { Routes } from "./config/routes";
import config from "./config"
import {pool} from "./database/postgres";

const app = express()

  // Add middlewares
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(helmet())
  app.use(compression())
  //app.use(morgan("combined"))
  app.use(morgan(':response-time ms - :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'));


  pool.connect((err, client, release) => {
        if (err) {
          return logger.error('DB Error acquiring client', err.stack)
        }
        logger.info('Database successfully pool initialized');

        client.query('SELECT NOW()', (err, result) => {
          release()
          if (err) {
            return console.error('Error executing query', err.stack)
          }
          logger.debug("Connect to DB at:" , result.rows)          
        });

        const port = config.PORT;
    
        app.listen(port, () => {
            logger.info(`App listening on port ${port}...`);
        }); 
   });
    
export default app;
*/

