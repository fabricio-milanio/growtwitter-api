import { User as UserEntity, Prisma } from '@prisma/client';
import { UserRepository } from '../database';
import { CreateUserDto } from '../dtos';
import { User } from '../models';
import * as bcrypt from 'bcrypt';
import { HTTPError } from '../utils';

type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    tweets: true;
    followers: { include: { follower: true } };
    _count: true;
  };
}>;

export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async createUser(dto: CreateUserDto): Promise<User> {
    const userAlreadyExists =
      await this.userRepository.findUserByEmailOrUsername(
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

  public async getUserProfile(id: string): Promise<User> {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new HTTPError(404, 'Usuário não encontrado.');
    }

    return this.mapToModel(user);
  }

  public async toggleFollow(followerId: string, followingId: string) {
    if (followerId === followingId) {
      throw new HTTPError(400, 'Você não pode seguir a si mesmo.');
    }

    const profileUser = await this.userRepository.findUserById(followingId);
    if (!profileUser) {
      throw new HTTPError(404, 'Usuário alvo não encontrado.');
    }

    const alreadyFollows = await this.userRepository.findUsersFollow(
      followerId,
      followingId,
    );

    if (alreadyFollows) {
      await this.userRepository.unfollowUser(followerId, followingId);
      return {
        followed: false,
        message: 'Você deixou de seguir este usuário.',
      };
    }

    await this.userRepository.followUser(followerId, followingId);
    return {
      followed: true,
      message: 'Agora você está seguindo este usuário.',
    };
  }

  private mapToModel(entity: any): User {
    return new User(
      entity.id,
      entity.name,
      entity.username,
      entity.email,
      entity.profileImage,
      entity.createdAt,
      entity.updatedAt,
      entity.tweets ?? [],
      entity.followers?.map((f: any) => f.follower) ?? [],
      entity.following?.map((f: any) => f.following) ?? [],
      entity._count,
    );
  }
}
