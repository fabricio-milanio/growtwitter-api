import express from 'express';
import { body, param } from 'express-validator';
import { dataValidation } from '../middlewares';

export class FeedRoutes {
  public static bind() {
    const router = express.Router();

    router.get(
      '/feed',
      // authMiddleware,
      dataValidation([param('id').isNumeric().isInt({ min: 1 })]),
      //controller.findExample,
    );

    return router;
  }
}
