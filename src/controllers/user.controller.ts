import { Request, Response } from 'express';
import { UserService } from '../services';
import { onError } from '../utils';
import { HTTPResponse } from '../utils/http.response';

export class UserController {
  constructor(private userService: UserService) {}

  public createUser = async (req: Request, res: Response) => {
    try {
      const { name, username, email, password, profileImage } = req.body;

      const newUser = await this.userService.createUser({
        name,
        username,
        email,
        password,
        profileImage,
      });

      return HTTPResponse({
        res,
        statusCode: 201,
        message: 'Usuário criado com sucesso!',
        data: newUser,
      });
    } catch (error) {
      onError(error, res);
    }
  };
}
