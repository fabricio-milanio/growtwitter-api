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

  public createReplyTweet = async (req: Request, res: Response) => {
    try {
      const { content, userId, tweetParentId } = req.body;

      if (!tweetParentId) {
        return res.status(400).json({
          success: false,
          message: 'O campo tweetParentId é obrigatório para respostas.',
        });
      }

      const createdReply = await this.tweetService.createReplyTweet({
        content,
        userId,
        tweetParentId,
      });

      res.status(201).json(createdReply.toJSON());
    } catch (error) {
      onError(error, res);
    }
  };

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
