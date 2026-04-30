import { TweetController } from '../controllers';
import { TweetService } from '../services';
import { TweetRepository } from '../database';
import { userRepository } from './user.container';

const tweetRepository = new TweetRepository();
const tweetService = new TweetService(tweetRepository, userRepository);
export const tweetController = new TweetController(tweetService);
