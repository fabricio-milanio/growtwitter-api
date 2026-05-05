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
        #swagger.description = 'Retorna o feed do usuário com seus tweets e os tweets de quem ele segue'
        #swagger.security = [{ bearerAuth: [] }]
        #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID do usuário',
          required: true,
          type: 'string',
          example: '550e8400-e29b-41d4-a716-446655440000'
        }
        #swagger.responses[200] = {
          description: 'Feed carregado com sucesso',
          schema: {
            success: true,
            message: 'Feed do usuário carregado com sucesso.',
            data: {
              id: '550e8400-e29b-41d4-a716-446655440000',
              name: 'Nome do usuário',
              username: 'username',
              email: 'usuario@email.com',
              profileImage: 'https://url-da-imagem.com/foto.jpg',
              createdAt: '2024-01-01T00:00:00.000Z',
              updatedAt: '2024-01-01T00:00:00.000Z',
              tweets: [
                {
                  id: '550e8400-e29b-41d4-a716-446655440001',
                  content: 'Conteúdo do tweet',
                  userId: '550e8400-e29b-41d4-a716-446655440000',
                  tweetParentId: null,
                  createdAt: '2024-01-01T00:00:00.000Z',
                  replies: []
                }
              ]
            }
          }
        }
        #swagger.responses[404] = { description: 'Usuário não encontrado' }
      */
      authMiddleware,
      userController.getUserFeed,
    );

    router.get(
      '/user/:id',
      /*
        #swagger.tags = ['Users']
        #swagger.description = 'Retorna o perfil completo do usuário com tweets, seguidores, seguindo e estatísticas'
        #swagger.security = [{ bearerAuth: [] }]
        #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID do usuário',
          required: true,
          type: 'string',
          example: '550e8400-e29b-41d4-a716-446655440000'
        }
        #swagger.responses[200] = {
          description: 'Perfil encontrado com sucesso',
          schema: {
            success: true,
            message: 'Perfil do usuário encontrado.',
            data: {
              id: '550e8400-e29b-41d4-a716-446655440000',
              name: 'Nome do usuário',
              username: 'username',
              email: 'usuario@email.com',
              profileImage: 'https://url-da-imagem.com/foto.jpg',
              createdAt: '2024-01-01T00:00:00.000Z',
              updatedAt: '2024-01-01T00:00:00.000Z',
              tweets: [],
              followers: [],
              following: [],
              stats: {}
            }
          }
        }
        #swagger.responses[400] = { description: 'UUID inválido' }
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
        #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: {
            name: 'Nome Completo',
            username: 'nome_usuario',
            email: 'usuario@email.com',
            password: 'senha123',
            profileImage: 'https://url-da-imagem.com/foto.jpg'
          }
        }
        #swagger.responses[201] = {
          description: 'Usuário criado com sucesso',
          schema: {
            success: true,
            message: 'Usuário criado com sucesso!',
            data: {
              id: '550e8400-e29b-41d4-a716-446655440000',
              name: 'Nome Completo',
              username: 'nome_usuario',
              email: 'usuario@email.com',
              profileImage: 'https://url-da-imagem.com/foto.jpg',
              createdAt: '2024-01-01T00:00:00.000Z',
              updatedAt: '2024-01-01T00:00:00.000Z'
            }
          }
        }
        #swagger.responses[400] = { description: 'Este e-mail já está em uso' }
        #swagger.responses[400] = { description: 'Este nome de usuário já está em uso' }
      */
      dataValidation([
        body('name').isString().isLength({ min: 3, max: 100 }),
        body('username').isString().isLength({ min: 2, max: 50 }),
        body('email').isEmail(),
        body('password').isString().isLength({ min: 6 }),
        body('profileImage').optional().isURL(),
      ]),
      userController.createUser,
    );

    router.post(
      '/users/:id/follow',
      /*
        #swagger.tags = ['Users']
        #swagger.description = 'Segue um usuário. O :id é quem vai seguir, userId no body é quem será seguido'
        #swagger.security = [{ bearerAuth: [] }]
        #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID do usuário que vai seguir',
          required: true,
          type: 'string',
          example: '550e8400-e29b-41d4-a716-446655440000'
        }
        #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: {
            userId: '550e8400-e29b-41d4-a716-446655440001'
          }
        }
        #swagger.responses[200] = {
          description: 'Usuário seguido com sucesso',
          schema: {
            success: true,
            message: 'Agora você está seguindo este usuário.',
            data: {
              followed: {
                id: '550e8400-e29b-41d4-a716-446655440001',
                name: 'Nome do usuário seguido',
                username: 'username_seguido',
                email: 'seguido@email.com',
                profileImage: 'https://url-da-imagem.com/foto.jpg',
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z'
              }
            }
          }
        }
        #swagger.responses[400] = { description: 'Você não pode seguir a si mesmo.' }
        #swagger.responses[400] = { description: 'Você já segue este usuário' }
        #swagger.responses[404] = { description: 'Usuário alvo não encontrado' }
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
        #swagger.description = 'Deixa de seguir um usuário. O :id é quem vai deixar de seguir, userId no body é quem será desseguido'
        #swagger.security = [{ bearerAuth: [] }]
        #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID do usuário que vai deixar de seguir',
          required: true,
          type: 'string',
          example: '550e8400-e29b-41d4-a716-446655440000'
        }
        #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: {
            userId: '550e8400-e29b-41d4-a716-446655440001'
          }
        }
        #swagger.responses[200] = {
          description: 'Deixou de seguir com sucesso',
          schema: {
            success: true,
            message: 'Você deixou de seguir este usuário.',
            data: {
              followed: {
                id: '550e8400-e29b-41d4-a716-446655440001',
                name: 'Nome do usuário desseguido',
                username: 'username_desseguido',
                email: 'desseguido@email.com',
                profileImage: 'https://url-da-imagem.com/foto.jpg',
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z'
              }
            }
          }
        }
        #swagger.responses[404] = { description: 'Usuário alvo não encontrado' }
        #swagger.responses[404] = { description: 'Você não segue este usuário' }
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
