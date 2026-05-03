import App from './app';
import { envs } from './envs';
import { AuthRoutes, TweetRoutes, UserRoutes } from './routes';

const app = new App(
  [AuthRoutes.bind(), TweetRoutes.bind(), UserRoutes.bind()],
  envs.PORT,
);

app.listen();
