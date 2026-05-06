import swaggerAutogen from 'swagger-autogen';
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL;

const host = API_URL || `localhost:${PORT}`;
const schemes = API_URL ? ['https'] : ['http'];

const doc = {
  info: {
    title: 'Growtwitter API',
    description:
      'O Growtwitter é uma API REST robusta desenvolvida como projeto final para o curso de Web Full Stack da Growdev...',
    version: '1.0.0',
  },
  host,
  schemes,
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    },
  },
};

const outputFile = './swagger-output.json';
const routes = [
  './src/routes/auth.routes.ts',
  './src/routes/tweet.routes.ts',
  './src/routes/user.routes.ts',
];

swaggerAutogen()(outputFile, routes, doc);
