import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json';

class App {
  public app: express.Application;
  public port: number;

  constructor(routers: express.Router[], port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(routers);
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
  }

  private initializeControllers(routers: express.Router[]) {
    routers.forEach((router) => {
      this.app.use(router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
