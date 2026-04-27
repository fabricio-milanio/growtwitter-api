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
          .isLength({ min: 3 })
          .withMessage('O nome deve ter pelo menos 3 caracteres'),

        body('username')
          .isString()
          .withMessage('O nome de usuário deve ser um texto')
          .isLength({ min: 2, max: 20 })
          .withMessage('O nome de usuário deve ter entre 2 e 20 caracteres'),

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

    return router;
  }
}
