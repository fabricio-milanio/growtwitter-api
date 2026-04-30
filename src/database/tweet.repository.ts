import { CreateUserDto, TweetDto } from '../dtos';
import { prisma } from './prisma.conection';

export class TweetRepository {
  constructor() {}

  public async createTweet(dto: TweetDto): Promise<TweetDto> {
    return await prisma.tweet.create({
      data: {
        content: dto.content,
        userId: dto.userId,
        tweetParentId: dto.tweetParentId,
      },
    });
  }

  public async updateTweet(tweetId: string, content: string) {
    return await prisma.tweet.update({
      where: { id: tweetId },
      data: { content },
    });
  }

  public async deleteTweet(tweetId: string) {
    return await prisma.tweet.delete({
      where: { id: tweetId },
    });
  }

  public async findTweetById(tweetId: string) {
    return await prisma.tweet.findUnique({
      where: { id: tweetId },
    });
  }

  public async findReplies(tweetId: string) {
    return await prisma.tweet.findMany({
      where: { tweetParentId: tweetId },
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
}
