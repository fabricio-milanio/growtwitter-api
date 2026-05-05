import {
  AuthController,
  TweetController,
  UserController,
} from '../controllers';
import { AuthService, TweetService, UserService } from '../services';
import { AuthRepository, TweetRepository, UserRepository } from '../database';

export const userRepository = new UserRepository();
export const tweetRepository = new TweetRepository();
export const authRepository = new AuthRepository();

export const userService = new UserService(userRepository, tweetRepository);
export const tweetService = new TweetService(tweetRepository, userRepository);
export const authService = new AuthService(authRepository);

export const userController = new UserController(userService);
export const tweetController = new TweetController(tweetService);
export const authController = new AuthController(authService);
