import { TweetController } from '../controllers';
import { TweetService } from '../services';
import { TweetRepository } from '../database';

const tweetRepository = new TweetRepository();
const tweetService = new TweetService(tweetRepository);
export const tweetController = new TweetController(tweetService);
