import { TweetRepository } from '../database';
import { CreateTweetDto, TweetDto } from '../dtos';
import { Tweet } from '../models';
import { HTTPError } from '../utils';

export class TweetService {
  constructor(private tweetRepository: TweetRepository) {}

  public async createTweet(dto: CreateTweetDto): Promise<Tweet> {
    const createdTweet = await this.tweetRepository.createTweet(dto);
    return this.mapToModel(createdTweet);
  }

  private mapToModel(entity: TweetDto): Tweet {
    return new Tweet(
      entity.id,
      entity.content,
      entity.userId,
      entity.createdAt,
      entity.tweetParentId,
    );
  }
}
