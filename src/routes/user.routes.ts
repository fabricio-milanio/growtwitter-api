import express from 'express';
import { body, param } from 'express-validator';
import { authMiddleware, dataValidation } from '../middlewares';
import { userController } from '../container';

export class UserRoutes {
  public static bind() {
    const router = express.Router();

    router.get(
      '/user/feed/:id',
      /*
        #swagger.tags = ['Users']
        #swagger.description = 'Retorna o feed de tweets do usuário (tweets próprios + tweets de quem segue)'
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID do usuário logado',
          required: true,
          type: 'string',
          format: 'uuid',
          example: '550e8400-e29b-41d4-a716-446655440000'
        }
        #swagger.responses[200] = {
          description: 'Feed carregado com sucesso',
          schema: {
            success: true,
            message: 'Feed do usuário carregado com sucesso.',
            data: {}
          }
        }        #swagger.responses[400] = { description: 'O ID do usuário fornecido deve ser um UUID válido.' }        #swagger.responses[400] = { description: 'O ID do usuário fornecido deve ser um UUID válido.' }
        #swagger.responses[404] = { description: 'Usuário não encontrado.' }
      */
      authMiddleware,
      dataValidation([
        param('id')
          .isUUID()
          .withMessage('O ID do usuário deve ser um UUID válido'),
      ]),
      userController.getUserFeed,
    );

    router.get(
      '/user/:id',
      /*
        #swagger.tags = ['Users']
        #swagger.description = 'Retorna o perfil completo do usuário'
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID do usuário a ser consultado',
          required: true,
          type: 'string',
          format: 'uuid',
          example: '550e8400-e29b-41d4-a716-446655440000'
        }
        #swagger.responses[200] = {
          description: 'Perfil encontrado com sucesso',
          schema: {
            success: true,
            message: 'Perfil do usuário encontrado.',
            data: { $ref: '#/components/schemas/User' }
          }
        }
        #swagger.responses[404] = { description: 'Usuário não encontrado' }
      */
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
      /*
        #swagger.tags = ['Users']
        #swagger.description = 'Cria um novo usuário'
        #swagger.security = []
        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'Fabrício Milanio' },
                  username: { type: 'string', example: 'fabricio_milanio' },
                  email: { type: 'string', example: 'fabricio@email.com' },
                  password: { type: 'string', example: 'senha123' },
                  profileImage: { type: 'string', example: 'https://url.com/foto.jpg' }
                },
                required: ['name', 'username', 'email', 'password']
              }
            }
          }
        }
        #swagger.responses[201] = {
          description: 'Usuário criado com sucesso',
          schema: {
            success: true,
            message: 'Usuário criado com sucesso!',
            data: { $ref: '#/components/schemas/User' }
          }
        }
        #swagger.responses[400] = { description: 'Este e-mail já está em uso.' }
        #swagger.responses[400] = { description: 'Este nome de usuário já está em uso.' }
      */
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
          .withMessage('Informe um endereço de e-mail válido')
          .isLength({ max: 255 }),
        body('password')
          .isString()
          .isLength({ min: 6, max: 255 })
          .withMessage('A senha deve ter pelo menos 6 caracteres'),
        body('profileImage')
          .optional()
          .isURL()
          .withMessage('A imagem de perfil deve ser um link (URL) válido')
          .isLength({ max: 255 }),
      ]),
      userController.createUser,
    );

    router.post(
      '/users/:id/follow',
      /*
        #swagger.tags = ['Users']
        #swagger.description = 'Segue um usuário. O :id é quem vai seguir, userId no body é quem será seguido'
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.parameters['id'] = { in: 'path', required: true, format: 'uuid' }
        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: 'object',
                properties: {
                  userId: { type: 'string', format: 'uuid', example: '550e8400-e29b-41d4-a716-446655440002' }
                },
                required: ['userId']
              }
            }
          }
        }
        #swagger.responses[200] = { description: 'Usuário seguido com sucesso' }
        #swagger.responses[400] = { description: 'Você não pode seguir a si mesmo.' }
        #swagger.responses[400] = { description: 'Usuário alvo não encontrado.' }
        #swagger.responses[400] = { description: 'Você já segue este usuário.' }
      */
      authMiddleware,
      dataValidation([
        param('id')
          .isUUID()
          .withMessage('O ID do usuário deve ser um UUID válido'),
        body('userId')
          .isUUID()
          .withMessage(
            'O ID do usuário que deseja seguir deve ser um UUID válido',
          ),
      ]),
      userController.followUser,
    );

    router.delete(
      '/users/:id/unfollow',
      /*
        #swagger.tags = ['Users']
        #swagger.description = 'Deixa de seguir um usuário'
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.parameters['id'] = { in: 'path', required: true, format: 'uuid' }
        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: 'object',
                properties: {
                  userId: { type: 'string', format: 'uuid' }
                },
                required: ['userId']
              }
            }
          }
        }
        #swagger.responses[200] = { description: 'Você deixou de seguir este usuário' }
        #swagger.responses[404] = { description: 'Usuário alvo não encontrado' }
        #swagger.responses[404] = { description: 'Você não segue este usuário.' }
      */
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
