import { User as UserEntity } from '@prisma/client';
import { UserRepository } from '../database';
import { CreateUserDto } from '../dtos';
import { User } from '../models';
import * as bcrypt from 'bcrypt';
import { HTTPError } from '../utils';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async createUser(dto: CreateUserDto): Promise<User> {
    console.log('Criando usuário com os seguintes dados:', dto);
    const userAlreadyExists = await this.userRepository.findByEmailOrUsername(
      dto.email,
      dto.username,
    );

    if (userAlreadyExists) {
      const message =
        userAlreadyExists.email === dto.email
          ? 'Este e-mail já está em uso.'
          : 'Este nome de usuário já está em uso.';

      throw new HTTPError(400, message);
    }

    const encryptedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = await this.userRepository.createUser({
      ...dto,
      password: encryptedPassword,
    });

    return this.mapToModel(newUser);
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
