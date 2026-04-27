import express from 'express';
import { body, param } from 'express-validator';
import { dataValidation } from '../middlewares';
import { userController } from '../container';

export class UserRoutes {
  public static bind() {
    const router = express.Router();

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

    router.get(
      '/users/:id',
      dataValidation([
        param('id')
          .isUUID()
          .withMessage('O ID do usuário deve ser um UUID válido'),
      ]),
      userController.getUserById,
    );

    router.post(
      '/users/:id/follow',
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
