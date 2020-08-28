import express from 'express';
import http from 'http';
import config from "../config";
//
import * as bodyParser from "body-parser";
import compression from "compression"
import helmet from "helmet"
import morgan from "morgan"
import logger from '../shared/logger';
import cors from 'cors';
//
import { Routes } from "../config/routes";
import {pool} from "../database/postgres";


// Control de ERRORES GRAVES
process.on("uncaughtException", e => {
        logger.debug(e);
        process.exit(1);
      });
process.on("unhandledRejection", e => {
        logger.debug(e);
        process.exit(1);
      });    

// Función para tracear todas las llamadas
function loggerMiddleware(request: express.Request, response: express.Response, next: express.NextFunction) {
    logger.debug(`LOG: ${request.method} ${request.path}`);
    next();
  }

export default class Server {
    private className = 'Server';
    // 4.2.2
    public static _instance: Server;
    // Aplicación express
    public app: express.Application;
    public port: number;
    // Servidor HTTP
    private httpServer: http.Server;
    // Rutas
    public routePrv: Routes = new Routes();
    // 4.2.2
    private constructor() {

       // Conectar la aplicación con express 
       this.app = express();
       this.port = Number( config.PORT );
       this.httpServer = new http.Server( this.app );
       this.config();
       this.routePrv.routes(this.app);

    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // this.app.use(express.json())
        // this.app.use(express.urlencoded({ extended: false }))
        // CORS
        const corsOptions = {
          origin: true,
          credentials:true
        };
        // this.app.use( cors({origin:true , credentials:true }));
        this.app.use( cors(corsOptions));
              
        this.app.use(compression())
        //app.use(morgan("combined"))
        this.app.use(morgan(':response-time ms - :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'));
      
        // Seguridad: https://expressjs.com/es/advanced/best-practice-security.html
        this.app.disable('x-powered-by');
        // -- Seguridad de cabeceras. Activamos todas las funciones
        this.app.use(helmet())
        //this.app.use(helmet.noCache());
        //this.app.use(helmet.frameguard());
        
        // Traceo a través de middleware
        this.app.use( loggerMiddleware );
      }    

    // 4.2.2
    public static get instance() {
        return this._instance || ( this._instance = new this());
    }

    public start( callback: Function ) {
        //this.app.listen( this.port , callback()  );  -> en vez de iniciar el servidor express, inicio http con info de app express
        this.httpServer.listen( this.port , callback() );
    }
}    