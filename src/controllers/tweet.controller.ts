import { Request, Response } from 'express';
import { onError } from '../utils';
import { TweetService } from '../services';
import { HTTPResponse } from '../utils/http.response';

export class TweetController {
  constructor(private tweetService: TweetService) {}

  public createTweet = async (req: Request, res: Response) => {
    try {
      const { content, userId, tweetParentId } = req.body;
      const createdTweet = await this.tweetService.createTweet({
        content,
        userId,
      });

      HTTPResponse({
        res,
        statusCode: 201,
        message: 'Tweet criado com sucesso.',
        data: createdTweet.toJSON(),
      });
    } catch (error) {
      onError(error, res);
    }
  };

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

      HTTPResponse({
        res,
        statusCode: 201,
        message: 'Resposta criada com sucesso.',
        data: createdReply.toJSON(),
      });
    } catch (error) {
      onError(error, res);
    }
  };

  public likeTweet = async (req: Request, res: Response) => {
    try {
      const { tweetId, userId } = req.body;

      const like = await this.tweetService.likeTweet(tweetId, userId);

      HTTPResponse({
        res,
        statusCode: 200,
        message: 'Tweet curtido com sucesso.',
        data: like,
      });
    } catch (error) {
      onError(error, res);
    }
  };

  public unlikeTweet = async (req: Request, res: Response) => {
    try {
      const { tweetId, userId } = req.body;

      const unlike = await this.tweetService.unlikeTweet(tweetId, userId);

      HTTPResponse({
        res,
        statusCode: 200,
        message: 'Removida a curtida do Tweet com sucesso.',
        data: unlike,
      });
    } catch (error) {
      onError(error, res);
    }
  };
}
