import { TweetRepository } from '../database';
import { CreateReplyDto, CreateTweetDto, TweetDto } from '../dtos';
import { Tweet } from '../models';
import { HTTPError } from '../utils';
import { validate as isUUID } from 'uuid';

export class TweetService {
  constructor(private tweetRepository: TweetRepository) {}

  public async createTweet(dto: CreateTweetDto): Promise<Tweet> {
    const createdTweet = await this.tweetRepository.createTweet(dto);
    return this.mapToModel(createdTweet);
  }

  public async createReplyTweet(dto: CreateReplyDto): Promise<Tweet> {
    if (!dto.tweetParentId) {
      throw new HTTPError(400, 'O ID do tweet a ser respondido é obrigatório.');
    }

    if (!isUUID(dto.tweetParentId)) {
      throw new HTTPError(400, 'O ID fornecido não é um UUID válido.');
    }

    const parentTweet = await this.tweetRepository.findTweetById(
      dto.tweetParentId,
    );

    if (!parentTweet) {
      throw new HTTPError(404, 'Tweet a ser respondido não foi encontrado');
    }

    const createdReply = await this.tweetRepository.createReplyTweet(dto);

    return this.mapToModel(createdReply);
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
