import { Request, Response } from 'express';
import { onError } from '../utils';
import { HTTPResponse } from '../utils/http.response';
import { AuthService } from '../services';

export class AuthController {
  constructor(private authService: AuthService) {}

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const result = await this.authService.loginService({ email, password });

      return HTTPResponse({
        res,
        statusCode: 200,
        message: 'Autenticação realizada com sucesso.',
        data: result,
      });
    } catch (error) {
      onError(error, res);
    }
  };
}
