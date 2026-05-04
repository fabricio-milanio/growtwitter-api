import express from 'express';
import { body, param } from 'express-validator';
import { authMiddleware, dataValidation } from '../middlewares';
import { userController } from '../container';

export class UserRoutes {
  public static bind() {
    const router = express.Router();

    router.get(
      '/user/feed/:id',
      authMiddleware,
      // dataValidation([
      //   body('userId')
      //     .isUUID()
      //     .withMessage('O ID do usuário deve ser um UUID válido'),
      // ]),
      userController.getUserFeed,
    );

    router.get(
      '/user/:id',
      authMiddleware,
      dataValidation([
        param('id')
          .isUUID()
          .withMessage('O ID do usuário deve ser um UUID válido'),
      ]),
      userController.getUserProfile,
    );

    router.post(
      '/users',
      dataValidation([
        body('name')
          .isString()
          .withMessage('O nome deve ser um texto')
          .isLength({ min: 3, max: 100 })
          .withMessage('O nome deve ter entre 3 e 100 caracteres'),

        body('username')
          .isString()
          .withMessage('O nome de usuário deve ser um texto')
          .isLength({ min: 2, max: 50 })
          .withMessage('O nome de usuário deve ter entre 2 e 50 caracteres'),

        body('email')
          .isEmail()
          .withMessage('Informe um endereço de e-mail válido'),

        body('password')
          .isString()
          .isLength({ min: 6 })
          .withMessage('A senha deve ter pelo menos 6 caracteres'),

        body('profileImage')
          .optional()
          .isURL()
          .withMessage('A imagem de perfil deve ser um link (URL) válido'),
      ]),
      userController.createUser,
    );

    router.post(
      '/users/:id/follow',
      authMiddleware,
      dataValidation([
        param('id')
          .isUUID()
          .withMessage('O ID do usuário deve ser um UUID válido'),

        body('userId')
          .isUUID()
          .withMessage('O ID do usuário que segue deve ser um UUID válido'),
      ]),
      userController.followUser,
    );

    router.delete(
      '/users/:id/unfollow',
      authMiddleware,
      dataValidation([
        param('id')
          .isUUID()
          .withMessage('O ID do usuário deve ser um UUID válido'),
        body('userId')
          .isUUID()
          .withMessage('O ID do usuário que segue deve ser um UUID válido'),
      ]),
      userController.unfollowUser,
    );

    return router;
  }
}
