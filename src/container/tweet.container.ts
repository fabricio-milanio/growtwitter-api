import { TweetController } from '../controllers';
import { TweetService } from '../services';
import { TweetRepository, UserRepository } from '../database';
import { User } from '../models';

const tweetRepository = new TweetRepository();
const userRepository = new UserRepository();
const tweetService = new TweetService(tweetRepository, userRepository);
export const tweetController = new TweetController(tweetService);
