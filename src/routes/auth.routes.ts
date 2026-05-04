import express from 'express';
import { body } from 'express-validator';
import { dataValidation } from '../middlewares';
import { authController } from '../container';

export class AuthRoutes {
  public static bind() {
    const router = express.Router();

    router.post(
      '/login',
      /*
        #swagger.tags = ['Auth']
        #swagger.description = 'Realiza o login do usuário'
        #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: {
            email: 'usuario@email.com',
            password: '123456'
          }
        }
        #swagger.responses[200] = {
          description: 'Login realizado com sucesso',
          schema: { token: 'jwt_token_aqui' }
        }
        #swagger.responses[401] = {
          description: 'E-mail ou senha inválidos'
      }
      */
      dataValidation([
        body('email').isString().isLength({ min: 1, max: 255 }),
        body('password').isString().isLength({ min: 1, max: 255 }),
      ]),
      authController.login,
    );

    return router;
  }
}
