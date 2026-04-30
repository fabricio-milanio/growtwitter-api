import { Request, Response } from 'express';
import { onError } from '../utils';
import { TweetService } from '../services';

export class TweetController {
  constructor(private tweetService: TweetService) {}

  public async createTweet(req: Request, res: Response) {
    try {
    } catch (error) {
      onError(error, res);
    }
  }

  public async updateTweet(req: Request, res: Response) {
    try {
    } catch (error) {
      onError(error, res);
    }
  }

  public async deleteTweet(req: Request, res: Response) {
    try {
    } catch (error) {
      onError(error, res);
    }
  }

  public async createReplyTweet(req: Request, res: Response) {
    try {
    } catch (error) {
      onError(error, res);
    }
  }

  public async likeTweet(req: Request, res: Response) {
    try {
    } catch (error) {
      onError(error, res);
    }
  }

  public async unlikeTweet(req: Request, res: Response) {
    try {
    } catch (error) {
      onError(error, res);
    }
  }
}
