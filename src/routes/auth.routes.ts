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
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', example: 'fabricio@email.com' },
                  password: { type: 'string', example: 'senha123' },
                },
            }
          }
        }
        #swagger.responses[200] = {
          description: 'Login realizado com sucesso',
          schema: {
            success: true,
            message: 'Autenticação realizada com sucesso.',
            data: {
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkM2UxZjE2LTUwODktNGMxOS04OGY3LThiNDFhZDhlZGE0NyIsImVtYWlsIjoiZmFicmljaW9AZW1haWwuY29tIiwidXNlcm5hbWUiOiJmYWJyaWNpb19taWxhbmlvIiwiaWF0IjoxNzc4MDI4Njk3LCJleHAiOjE3NzgwMzk0OTd9.0oQyPuK61QIo1V8zXFanynvsvobcq7xzjZq5At59Uqo',
              user: {
              name: { type: 'string', example: 'Fabrício Milanio' },
                id: { tyoe: 'string', example: 'ad3e1f16-5089-4c19-88f7-8b41ad8eda47' }
                  username: { type: 'string', example: 'fabricio_milanio' },
                  email: { type: 'string', example: 'fabricio@email.com' },
                  password: { type: 'string', example: 'senha123' },
                  profileImage: { type: 'string', example: 'https://url.com/foto.jpg' },
                  createdAt: { type: 'date', example: '01/01/2000' }
              }
            }
          }
        }
        #swagger.responses[400] = { description: 'As variáveis de ambiente JWT_SECRET e JWT_EXPIRES_IN devem estar configuradas.' }
        #swagger.responses[401] = { description: 'E-mail ou senha inválidos' }
      */
      dataValidation([
        body('email').isEmail().isLength({ max: 255 }),
        body('password').isString().isLength({ min: 6, max: 255 }),
      ]),
      authController.login,
    );

    return router;
  }
}
