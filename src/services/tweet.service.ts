import { TweetRepository } from '../database';
import { TweetDto } from '../dtos';
import { Tweet, User } from '../models';
import { HTTPError } from '../utils';

export class TweetService {
  constructor(private tweetRepository: TweetRepository) {}

  public async createTweet(dto: TweetDto) {
    const createdTweet = await this.tweetRepository.createTweet(dto);
    return this.mapToModel(createdTweet);
  }

  private mapToModel(entity: TweetDto): Tweet {
    return new Tweet(
      entity.id,
      entity.content,
      entity.userId,
      entity.tweetParentId || null,
      entity.createdAt,
    );
  }
}
