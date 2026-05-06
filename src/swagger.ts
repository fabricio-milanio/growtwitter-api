import swaggerAutogen from 'swagger-autogen';
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL?.replace(/^https?:\/\//, '');
const host = API_URL || `localhost:${PORT}`;
const scheme = process.env.API_URL?.includes('https') ? 'https' : 'http';

const doc = {
  openapi: '3.0.0',
  info: {
    title: 'Growtwitter API',
    version: '1.0.0',
    description:
      'O Growtwitter é uma API REST robusta desenvolvida como projeto final para o curso de Web Full Stack da Growdev. A aplicação simula as funcionalidades principais de uma rede social, permitindo a interação em tempo real entre usuários através de tweets, respostas, curtidas e um sistema dinâmico de seguidores. O objetivo do projeto é consolidar conhecimentos em desenvolvimento backend, focando em escalabilidade, organização de código com Programação Orientada a Objetos (POO) e persistência de dados relacionais.',
  },
  servers: [{ url: `${scheme}://${host}` }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string', example: 'Fabrício Milanio' },
          username: { type: 'string', example: 'fabricio_milanio' },
          email: { type: 'string', example: 'fabricio@email.com' },
          profileImage: { type: 'string', example: 'https://url.com/foto.jpg' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      Tweet: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          content: { type: 'string', example: 'Conteúdo do tweet' },
          userId: { type: 'string', format: 'uuid' },
          tweetParentId: { type: 'string', format: 'uuid', nullable: true },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      Login: {
        type: 'object',
        properties: {
          email: { type: 'string', example: 'fabricio@email.com' },
          password: { type: 'string', example: 'senha123' },
        },
      },
    },
  },
};

const outputFile = './swagger.json';
const routes = [
  './src/routes/auth.routes.ts',
  './src/routes/tweet.routes.ts',
  './src/routes/user.routes.ts',
];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc);
