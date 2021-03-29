import * as dotenv from 'dotenv';
dotenv.config();
import * as cluster from 'cluster';
import * as os from 'os';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';

const startApp = async(): Promise<void> => {

  const {app} = await import('./app');
  const {lsMango} = await import('@ls-util/db/ls-mongo');
  await lsMango.init(process.env.MONGODB_URI);
  app.app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(), winston.format.json()
    ),
    meta: true,
    msg: 'HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}',
    expressFormat: true,
    colorize: false,
    headerBlacklist: [ 'ACCESSTOKEN', 'Authorization' ]
  }));
  app.configApp();

  app.app.use(expressWinston.errorLogger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(), winston.format.json()
    )
  }));
  // Start express App
  app.app.listen(process.env.PORT, () => {

    console.warn(`${process.env.MODE} server is running at http://localhost:${process.env.PORT} with process id ${process.pid}`);

  });

};

if (cluster.isMaster) {

  const CPUS: Array<os.CpuInfo> = os.cpus();
  CPUS.forEach(() => cluster.fork());

  cluster.on('online', (worker) => {

    console.warn(`Worker ${worker.process.pid} is online`);

  });

  cluster.on('exit', (worker, code, signal) => {

    console.warn(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
    console.warn('Starting a new worker');
    cluster.fork();

  });

} else {

  startApp();

}
