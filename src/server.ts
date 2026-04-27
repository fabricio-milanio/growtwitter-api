import App from './app';
import { envs } from './envs';
import { AuthRoutes, FeedRoutes, TweetRoutes, UserRoutes } from './routes';

const app = new App(
  [AuthRoutes.bind(), FeedRoutes.bind(), TweetRoutes.bind(), UserRoutes.bind()],
  envs.PORT,
);

app.listen();
