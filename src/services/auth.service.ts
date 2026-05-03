import { User as UserEntity } from '@prisma/client';
import { LoginDto } from '../dtos';
import { User } from '../models';
import { HTTPError } from '../utils';
import { AuthRepository } from '../database';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  public async loginService(dto: LoginDto) {
    const user = await this.authRepository.login(dto);

    if (!user) {
      throw new HTTPError(401, 'E-mail ou senha inválidos');
    }

    const validPassword = await bcrypt.compare(dto.password, user.password);

    if (!validPassword) {
      throw new HTTPError(401, 'E-mail ou senha inválidos');
    }

    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;

    if (!secret || !expiresIn) {
      throw new Error(
        'As variáveis de ambiente JWT_SECRET e JWT_EXPIRES_IN devem estar configuradas.',
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      secret,
      { expiresIn: expiresIn as SignOptions['expiresIn'] },
    );

    return {
      token,
      user: this.mapToModel(user),
    };
  }

  private mapToModel(entity: UserEntity): User {
    return new User(
      entity.id,
      entity.name,
      entity.username,
      entity.email,
      entity.profileImage,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
