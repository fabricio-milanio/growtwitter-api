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
        #swagger.description = 'Retorna o feed do usuário'
        #swagger.security = [{ "bearerAuth": [] }]
      */
      authMiddleware,
      userController.getUserFeed,
    );

    router.post(
      '/users',
      /*
        #swagger.tags = ['Users']
        #swagger.description = 'Cria um novo usuário'
        #swagger.security = []
        #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: {
            name: 'Fabrício Silva',
            username: 'fabricio_silva',
            email: 'fabricio@email.com',
            password: 'senha123',
            profileImage: 'https://url-da-imagem.com/foto.jpg'
          }
        }
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
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: { userId: 'ID-DO-USUARIO-ALVO' }
        }
      */
      authMiddleware,
      dataValidation([param('id').isUUID(), body('userId').isUUID()]),
      userController.followUser,
    );

    router.delete(
      '/users/:id/unfollow',
      /*
        #swagger.tags = ['Users']
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: { userId: 'ID-DO-USUARIO-ALVO' }
        }
      */
      authMiddleware,
      dataValidation([param('id').isUUID(), body('userId').isUUID()]),
      userController.unfollowUser,
    );

    return router;
  }
}
