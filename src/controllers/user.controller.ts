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

  public getUserProfile = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const user = await this.userService.getUserProfile(id as string);

      return HTTPResponse({
        res,
        statusCode: 200,
        message: 'Perfil do usuário encontrado.',
        data: user,
      });
    } catch (error) {
      onError(error, res);
    }
  };

  public followUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params as { id: string };
      const { userId } = req.body as { userId: string };
      const followedUser = await this.userService.getUserById(userId);

      const result = await this.userService.toggleFollow(id, userId);

      return HTTPResponse({
        res,
        statusCode: 200,
        message: result.message,
        data: { followed: followedUser },
      });
    } catch (error) {
      onError(error, res);
    }
  };

  public unfollowUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params as { id: string };
      const { userId } = req.body as { userId: string };
      const followedUser = await this.userService.getUserById(userId);

      const result = await this.userService.toggleFollow(userId, id);

      return HTTPResponse({
        res,
        statusCode: 200,
        message: result.message,
        data: { followed: followedUser },
      });
    } catch (error) {
      onError(error, res);
    }
  };

  public getUserFeed = async (req: Request, res: Response) => {
    try {
      const { id } = req.params as { id: string };
      const userFeed = await this.userService.getUserFeed(id);
      return HTTPResponse({
        res,
        statusCode: 200,
        message: 'Feed do usuário carregado com sucesso.',
        data: userFeed,
      });
    } catch (error) {
      onError(error, res);
    }
  };
}
