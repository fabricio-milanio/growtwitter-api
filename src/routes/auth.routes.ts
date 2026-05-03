import express from 'express';
import { body } from 'express-validator';
import { dataValidation } from '../middlewares';
import { authController } from '../container';

export class AuthRoutes {
  public static bind() {
    const router = express.Router();

    router.post(
      '/login',
      dataValidation([
        body('email').isString().isLength({ min: 1, max: 255 }),
        body('password').isString().isLength({ min: 1, max: 255 }),
      ]),
      authController.login,
    );

    return router;
  }
}
