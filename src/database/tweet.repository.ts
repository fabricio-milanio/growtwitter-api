import {
  CreateReplyDto,
  CreateTweetDto,
  CreateUserDto,
  TweetDto,
} from '../dtos';
import { prisma } from './prisma.conection';

export class TweetRepository {
  constructor() {}

  public async createTweet(dto: CreateTweetDto): Promise<TweetDto> {
    return await prisma.tweet.create({
      data: {
        content: dto.content,
        userId: dto.userId,
      },
    });
  }

  public async createReplyTweet(dto: CreateReplyDto): Promise<TweetDto> {
    return await prisma.tweet.create({
      data: {
        content: dto.content,
        userId: dto.userId,
        tweetParentId: dto.tweetParentId,
      },
    });
  }

  public async findTweetById(tweetId: string) {
    const tweet = await prisma.tweet.findUnique({
      where: { id: tweetId },
    });

    if (!tweet) {
      return null;
    }

    return tweet;
  }

  public async findReplies(tweetId: string) {
    return await prisma.tweet.findMany({
      where: { tweetParentId: tweetId },
    });
  }

  public async getFullFeed(userIds: string[]) {
    return await prisma.tweet.findMany({
      where: {
        userId: { in: userIds },
        tweetParentId: null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            profileImage: true,
          },
        },
        replies: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                profileImage: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
        _count: {
          select: { likes: true, replies: true },
        },
      },
      orderBy: { createdAt: 'desc' }, // Tweets mais novos primeiro
    });
  }

  public async findLikes(tweetId: string) {
    return await prisma.like.findMany({
      where: { tweetId },
    });
  }

  public async likeTweet(tweetId: string, userId: string) {
    return await prisma.like.create({
      data: {
        tweetId,
        userId,
      },
    });
  }

  public async unlikeTweet(tweetId: string, userId: string) {
    return await prisma.like.delete({
      where: {
        tweetId_userId: {
          tweetId,
          userId,
        },
      },
    });
  }

  public findTweetsByUserId = async (userId: string) => {
    return await prisma.tweet.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            name: true,
            username: true,
            profileImage: true,
          },
        },
      },
    });
  };
}
