import express from "express"
import compression from "compression"
import helmet from "helmet"
import morgan from "morgan"
import logger from './shared/logger';

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