import express from 'express';
import { body, param } from 'express-validator';
import { dataValidation } from '../middlewares';
import { tweetController } from '../container/tweet.container';

export class TweetRoutes {
  public static bind() {
    const router = express.Router();

    router.post(
      '/tweets',
      // authMiddleware,
      dataValidation([
        body('content').isString().isLength({ min: 1, max: 280 }),
        body('userId').isUUID(),
        body('tweetParentId').optional({ nullable: true }).isUUID(),
      ]),
      tweetController.createTweet,
    );

    router.post(
      '/tweets/reply',
      // authMiddleware,
      dataValidation([
        body('content').isString().isLength({ min: 1, max: 280 }),
        body('userId').isUUID(),
        body('tweetParentId').isUUID(),
      ]),
      tweetController.createReplyTweet,
    );

    router.put(
      '/tweets/:id',
      // authMiddleware,
      dataValidation([
        param('id').isNumeric().isInt({ min: 1 }),
        body('fieldOptional').optional().isString(),
      ]),
      //controller.updateExample,
    );

    router.delete(
      '/tweets/:id',
      // authMiddleware,
      dataValidation([param('id').isNumeric().isInt({ min: 1 })]),
      //controller.deleteExample,
    );

    router.post(
      '/tweets/:id/like',
      // authMiddleware,
      dataValidation([param('id').isNumeric().isInt({ min: 1 })]),
      //controller.likeTweet,
    );

    router.delete(
      '/tweets/:id/unlike',
      // authMiddleware,
      dataValidation([param('id').isNumeric().isInt({ min: 1 })]),
      //controller.unlikeTweet,
    );

    return router;
  }
}
