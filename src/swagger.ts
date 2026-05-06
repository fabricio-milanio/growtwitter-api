import swaggerAutogen from 'swagger-autogen';
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL;

const host = API_URL || `localhost:${PORT}`;
const scheme = API_URL ? 'https' : 'http';

const doc = {
  openapi: '3.0.0',
  info: {
    title: 'Growtwitter API',
    description:
      'O Growtwitter é uma API REST robusta desenvolvida como projeto final para o curso de Web Full Stack da Growdev...',
    version: '1.0.0',
  },
  servers: [
    {
      url: `${scheme}://${host}`,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const outputFile = './swagger-output.json';
const routes = [
  './src/routes/auth.routes.ts',
  './src/routes/tweet.routes.ts',
  './src/routes/user.routes.ts',
];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc);
