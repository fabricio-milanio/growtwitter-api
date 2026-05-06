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
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: 'object',
                properties: {
                  content: { type: 'string', example: 'Meu tweet de até 500 caracteres' },
                  userId: { type: 'string', format: 'uuid' },
                }
              }
            }
          }
        }
        #swagger.responses[201] = { description: 'Tweet criado com sucesso' }
        #swagger.responses[401] = { description: 'Não autorizado (Token ausente ou inválido)' }
      */
      authMiddleware,
      dataValidation([
        body('content').isString().isLength({ min: 1, max: 500 }),
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
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: 'object',
                properties: {
                  content: { type: 'string' },
                  userId: { type: 'string', format: 'uuid' },
                  tweetParentId: { type: 'string', format: 'uuid' }
                }
              }
            }
          }
        }
        #swagger.responses[201] = { description: 'Resposta criada com sucesso' }
        #swagger.responses[400] = { description: 'O ID do tweet a ser respondido é obrigatório.' }
        #swagger.responses[400] = { description: 'O ID fornecido não é um UUID válido.' }
        #swagger.responses[404] = { description: 'Tweet a ser respondido não foi encontrado' }
      */
      authMiddleware,
      dataValidation([
        body('content').isString().isLength({ min: 1, max: 500 }),
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
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: 'object',
                properties: {
                  tweetId: { type: 'string', format: 'uuid' },
                  userId: { type: 'string', format: 'uuid' }
                }
              }
            }
          }
        }
        #swagger.responses[200] = { description: 'Tweet curtido com sucesso' }
        'O userId e tweetId fornecidos devem ser UUIDs válidos.',
        #swagger.responses[400] = { description: 'Você já curtiu este tweet.' }
        #swagger.responses[404] = { description: 'Tweet não foi encontrado' }
        #swagger.responses[404] = { description: 'Usuário não foi encontrado' }
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
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: 'object',
                properties: {
                  tweetId: { type: 'string', format: 'uuid' },
                  userId: { type: 'string', format: 'uuid' }
                }
              }
            }
          }
        }
        #swagger.responses[200] = { description: 'Removida a curtida do Tweet com sucesso.' }
        #swagger.responses[400] = { description: 'O userId e tweetId fornecidos devem ser UUIDs válidos.' }
        #swagger.responses[400] = { description: 'Você não curtiu este tweet.' }
        #swagger.responses[404] = { description: 'Usuário não foi encontrado' }
        #swagger.responses[404] = { description: 'Tweet não foi encontrado' }
      */
      authMiddleware,
      dataValidation([body('tweetId').isUUID(), body('userId').isUUID()]),
      tweetController.unlikeTweet,
    );

    return router;
  }
}
