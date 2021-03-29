import * as winston from 'winston';

class LSLogger {

    private logger:winston.Logger;

    constructor() {

      this.logger = winston.createLogger({
        format: winston.format.simple(),
        transports: [
          new winston.transports.Console(),
        ]
      });

    }

    info = (message:string) => this.logger.info(message);

    error = (message:string) => this.logger.error(message);

}

export const lsLogger = new LSLogger();
