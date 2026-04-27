import { CreateUserDto } from '../dtos';
import { prisma } from './prisma.conection';

export class UserRepository {
  constructor() {}

  public async createUser(data: CreateUserDto) {
    return prisma.user.create({
      data: { ...data },
    });
  }

  public async findUserByEmailOrUsername(email: string, username: string) {
    return await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });
  }

  public async findUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  //Quem o usuário está seguindo
  public async findUsersFollowers(userId: string) {
    return await prisma.follower.findMany({
      where: { followingId: userId },
      include: {
        follower: true,
      },
    });
  }

  //Quem segue o usuário
  public async findUsersFollowing(userId: string) {
    return await prisma.follower.findMany({
      where: { followerId: userId },
      include: {
        following: true,
      },
    });
  }

  public async findUserFollow(
    followerId: string,
    followingId: string,
  ): Promise<boolean> {
    const follower = await prisma.follower.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    return !!follower;
  }

  public async followUser(followerId: string, followingId: string) {
    return await prisma.follower.create({
      data: {
        followerId,
        followingId,
      },
    });
  }

  public async unfollowUser(followerId: string, followingId: string) {
    return await prisma.follower.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
  }
}
