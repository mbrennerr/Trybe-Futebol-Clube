import * as express from 'express';
import ErrorMiddleware from './middlewares/ErrorMiddleware';
import LoginRoute from './routes/LoginRoute';
import TeamsRoute from './routes/TeamsRoute';

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.app = express(); // app must build before config;
    this.config();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(LoginRoute);
    this.app.use(TeamsRoute);
    // this.app.get('/teams', async (_req, res) => {
    //   res.status(200).json(await Teams.getAll());
    // });

    this.app.use(ErrorMiddleware);
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`listening behind the door ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
