import { Request, Response } from 'express';
import { onError } from '../utils';
import { TweetService } from '../services';

export class TweetController {
  constructor(private tweetService: TweetService) {}

  public createTweet = async (req: Request, res: Response) => {
    try {
      const { content, userId, tweetParentId } = req.body;
      const createdTweet = await this.tweetService.createTweet({
        content,
        userId,
        tweetParentId,
      });
      res.status(201).json(createdTweet.toJSON());
    } catch (error) {
      onError(error, res);
    }
  };

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
