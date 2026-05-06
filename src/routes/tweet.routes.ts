import express from 'express';
import { body } from 'express-validator';
import { authMiddleware, dataValidation } from '../middlewares';
import { tweetController } from '../container';

export class TweetRoutes {
  public static bind() {
    const router = express.Router();

    router.post(
      '/tweets',
      /*
        #swagger.tags = ['Tweets']
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: {
            content: 'Meu primeiro tweet!',
            userId: 'SEU-UUID-AQUI'
          }
        }
      */
      authMiddleware,
      dataValidation([
        body('content').isString().isLength({ min: 1, max: 280 }),
        body('userId').isUUID(),
      ]),
      tweetController.createTweet,
    );

    router.post(
      '/tweets/reply',
      /*
        #swagger.tags = ['Tweets']
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: {
            content: 'Resposta!',
            userId: 'SEU-UUID-AQUI',
            tweetParentId: 'UUID-DO-TWEET-PAI'
          }
        }
      */
      authMiddleware,
      tweetController.createReplyTweet,
    );

    router.post(
      '/tweets/like',
      /*
        #swagger.tags = ['Tweets']
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: {
            tweetId: 'UUID-DO-TWEET',
            userId: 'SEU-UUID-AQUI'
          }
        }
      */
      authMiddleware,
      tweetController.likeTweet,
    );

    router.delete(
      '/tweets/unlike',
      /*
        #swagger.tags = ['Tweets']
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: {
            tweetId: 'UUID-DO-TWEET',
            userId: 'SEU-UUID-AQUI'
          }
        }
      */
      authMiddleware,
      tweetController.unlikeTweet,
    );

    return router;
  }
}
