import swaggerAutogen from 'swagger-autogen';
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

const doc = {
  info: {
    title: 'Growtwitter API',
    description:
      'O Growtwitter é uma API REST robusta desenvolvida como projeto final para o curso de Web Full Stack da Growdev. A aplicação simula as funcionalidades principais de uma rede social, permitindo a interação em tempo real entre usuários através de tweets, respostas, curtidas e um sistema dinâmico de seguidores. O objetivo do projeto é consolidar conhecimentos em desenvolvimento backend, focando em escalabilidade, organização de código com Programação Orientada a Objetos (POO) e persistência de dados relacionais.',
    version: '1.0.0',
  },
  host: `localhost:${PORT}`,
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
