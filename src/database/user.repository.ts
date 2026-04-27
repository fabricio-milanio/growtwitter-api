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
      include: {
        tweets: {
          orderBy: { createdAt: 'desc' },
        },
        followers: {
          include: { follower: true },
        },
        following: {
          include: { following: true },
        },
        _count: {
          select: {
            followers: true,
            following: true,
            tweets: true,
          },
        },
      },
    });
  }

  public async findUsersFollow(
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
