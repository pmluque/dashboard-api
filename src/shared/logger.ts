import { createLogger, format, transports } from 'winston';
// Configuración
import config from '../config'

// Import Functions
const { File, Console } = transports;
// Init Logger
const logger = createLogger({
   level: config.LOG_LEVEL,
});
const errorStackFormat = format((info) => {
   if (info.stack) {
      // tslint:disable-next-line:no-console
      console.log(info.stack);
      return false;
    }
      return info;
   });
const consoleTransport = new Console({
       format: format.combine(
           format.colorize(),
           format.simple(),
           errorStackFormat(),
       ),
   });
logger.add(consoleTransport);

export default logger;