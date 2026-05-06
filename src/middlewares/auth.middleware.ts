import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HTTPResponse } from '../utils';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return HTTPResponse({
        res,
        statusCode: 401,
        message: 'Token não fornecido',
      });
    }

    const partsJWT = authHeader.split(' ');
    const [bearer, token] = partsJWT;

    if (partsJWT.length !== 2) {
      return HTTPResponse({
        res,
        statusCode: 401,
        message: 'Erro no formato do token',
      });
    }

    if (!/^Bearer$/i.test(bearer)) {
      return HTTPResponse({
        res,
        statusCode: 401,
        message: 'Token nao é do tipo Bearer',
      });
    }

    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as {
      id: string;
      name: string;
      username: string;
    };

    req.user = {
      id: decoded.id,
      name: decoded.name,
      username: decoded.username,
    };

    return next();
  } catch (error) {
    return HTTPResponse({
      res,
      statusCode: 401,
      message: 'Token inválido ou expirado',
    });
  }
};
