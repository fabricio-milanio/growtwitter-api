import App from './app';
import { envs } from './envs';
import { UserRoutes } from './routes';

const app = new App(
  [
    UserRoutes.bind(),
    // Add more routes here
  ],
  envs.PORT,
);

app.listen();
