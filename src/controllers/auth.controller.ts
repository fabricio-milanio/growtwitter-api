import { Request, Response } from 'express';
import { onError } from '../utils';
import { HTTPResponse } from '../utils/http.response';

export class AuthController {
  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = 'Resultado da autenticação';

      return HTTPResponse({
        res,
        statusCode: 200,
        message: 'Autenticação realizada com sucesso.',
        data: result,
      });
    } catch (error) {
      onError(error, res);
    }
  }
}
