import express from 'express';
import { body } from 'express-validator';
import { authMiddleware, dataValidation } from '../middlewares';
import { tweetController } from '../container';

export class TweetRoutes {
  public static bind() {
    const router = express.Router();

    router.post(
      '/tweets',
      /*
        #swagger.tags = ['Tweets']
        #swagger.description = 'Cria um novo tweet'
        #swagger.security = [{ bearerAuth: [] }]
        #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: {
            content: 'Conteúdo do tweet (máx. 280 caracteres)',
            userId: '550e8400-e29b-41d4-a716-446655440000'
          }
        }
        #swagger.responses[201] = {
          description: 'Tweet criado com sucesso',
          schema: {
            success: true,
            message: 'Tweet criado com sucesso.',
            data: {
              id: '550e8400-e29b-41d4-a716-446655440000',
              content: 'Conteúdo do tweet',
              userId: '550e8400-e29b-41d4-a716-446655440000',
              tweetParentId: null,
              createdAt: '2024-01-01T00:00:00.000Z',
              replies: []
            }
          }
        }
      */
      authMiddleware,
      dataValidation([
        body('content').isString().isLength({ min: 1, max: 280 }),
        body('userId').isUUID(),
        body('tweetParentId').optional({ nullable: true }).isUUID(),
      ]),
      tweetController.createTweet,
    );

    router.post(
      '/tweets/reply',
      /*
        #swagger.tags = ['Tweets']
        #swagger.description = 'Cria uma resposta para um tweet existente'
        #swagger.security = [{ bearerAuth: [] }]
        #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: {
            content: 'Conteúdo da resposta (máx. 280 caracteres)',
            userId: '550e8400-e29b-41d4-a716-446655440000',
            tweetParentId: '550e8400-e29b-41d4-a716-446655440001'
          }
        }
        #swagger.responses[201] = {
          description: 'Resposta criada com sucesso',
          schema: {
            success: true,
            message: 'Resposta criada com sucesso.',
            data: {
              id: '550e8400-e29b-41d4-a716-446655440002',
              content: 'Conteúdo da resposta',
              userId: '550e8400-e29b-41d4-a716-446655440000',
              tweetParentId: '550e8400-e29b-41d4-a716-446655440001',
              createdAt: '2024-01-01T00:00:00.000Z',
              replies: []
            }
          }
        }
        #swagger.responses[400] = { description: 'O ID do tweet a ser respondido é obrigatório.' }
        #swagger.responses[400] = { description: 'O ID fornecido não é um UUID válido.' }
        #swagger.responses[404] = { description: 'Tweet a ser respondido não foi encontrado' }
      */
      authMiddleware,
      dataValidation([
        body('content').isString().isLength({ min: 1, max: 280 }),
        body('userId').isUUID(),
        body('tweetParentId').isUUID(),
      ]),
      tweetController.createReplyTweet,
    );

    router.post(
      '/tweets/like',
      /*
        #swagger.tags = ['Tweets']
        #swagger.description = 'Curte um tweet'
        #swagger.security = [{ bearerAuth: [] }]
        #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: {
            tweetId: '550e8400-e29b-41d4-a716-446655440000',
            userId: '550e8400-e29b-41d4-a716-446655440001'
          }
        }
        #swagger.responses[200] = {
          description: 'Tweet curtido com sucesso',
          schema: {
            success: true,
            message: 'Tweet curtido com sucesso.',
            data: null
          }
        }
        #swagger.responses[400] = { description: 'O userId e tweetId fornecidos devem ser UUIDs válidos.' }
        #swagger.responses[400] = { description: 'Você já curtiu este tweet.' }
        #swagger.responses[404] = { description: 'Tweet não foi encontrado.' }
        #swagger.responses[404] = { description: 'Usuário não foi encontrado.' }
      */
      authMiddleware,
      dataValidation([body('tweetId').isUUID(), body('userId').isUUID()]),
      tweetController.likeTweet,
    );

    router.delete(
      '/tweets/unlike',
      /*
        #swagger.tags = ['Tweets']
        #swagger.description = 'Remove a curtida de um tweet'
        #swagger.security = [{ bearerAuth: [] }]
        #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: {
            tweetId: '550e8400-e29b-41d4-a716-446655440000',
            userId: '550e8400-e29b-41d4-a716-446655440001'
          }
        }
        #swagger.responses[200] = {
          description: 'Curtida removida com sucesso',
          schema: {
            success: true,
            message: 'Removida a curtida do Tweet com sucesso.',
            data: null
          }
        }
        #swagger.responses[400] = { description: 'O userId e tweetId fornecidos devem ser UUIDs válidos.' }
        #swagger.responses[400] = { description: 'Você não curtiu este tweet.' }
        #swagger.responses[404] = { description: 'Tweet não foi encontrado.' }
        #swagger.responses[404] = { description: 'Usuário não foi encontrado.' }
      */
      authMiddleware,
      dataValidation([body('tweetId').isUUID(), body('userId').isUUID()]),
      tweetController.unlikeTweet,
    );

    return router;
  }
}
