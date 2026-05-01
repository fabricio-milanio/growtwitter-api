import { TweetController, UserController } from '../controllers';
import { TweetService, UserService } from '../services';
import { TweetRepository, UserRepository } from '../database';

export const userRepository = new UserRepository();
export const tweetRepository = new TweetRepository();

export const userService = new UserService(userRepository, tweetRepository);
export const tweetService = new TweetService(tweetRepository, userRepository);

export const userController = new UserController(userService);
export const tweetController = new TweetController(tweetService);
