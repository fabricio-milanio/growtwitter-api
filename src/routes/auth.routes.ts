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
              user: {
                id: '550e8400-e29b-41d4-a716-446655440000',
                name: 'Fabrício Silva',
                username: 'fabricio_silva',
                email: 'fabricio@email.com',
                profileImage: 'https://url-da-imagem.com/foto.jpg',
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z'
              }
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
