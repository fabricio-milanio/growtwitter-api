import { User as UserEntity } from '@prisma/client';
import { UserRepository } from '../database';
import { CreateUserDto } from '../dtos';
import { User } from '../models';
import * as bcrypt from 'bcrypt';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async createUser(dto: CreateUserDto): Promise<User> {
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
