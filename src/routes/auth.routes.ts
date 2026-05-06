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
        #swagger.security = []
        #swagger.parameters['body'] = {
          in: 'body',
          description: 'Credenciais de acesso',
          required: true,
          schema: {
            email: 'fabricio@email.com',
            password: 'senha123'
          }
        }
        #swagger.responses[200] = {
          description: 'Login realizado com sucesso',
          schema: {
            success: true,
            message: 'Autenticação realizada com sucesso.',
            data: {
              token: 'jwt_token_aqui',
              user: { $ref: '#/components/User' }
            }
          }
        }
        #swagger.responses[401] = { description: 'E-mail ou senha inválidos' }
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
