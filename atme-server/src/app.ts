import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import { APIRouter } from '@ls-api/index';
import { BASE_URI } from '@atme/serverAPI';

class App {

  public app: express.Application;

  constructor() {

    this.app = express();

  }

  configApp = (): void => {

    this.app.set('etag', false);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(BASE_URI, APIRouter);

    // Declare the path to frontend's static assets
    this.app.use(express['static'](path.resolve('.', 'static')));

    // Intercept requests to return the frontend's static entry point
    this.app.get('*', (_request, response) => {

      response.sendFile(path.resolve('.', 'static', 'index.html'));

    });

  }

}

export const app = new App();
