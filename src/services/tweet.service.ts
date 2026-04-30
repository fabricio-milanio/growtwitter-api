import { TweetRepository, UserRepository } from '../database';
import { CreateReplyDto, CreateTweetDto, TweetDto } from '../dtos';
import { Tweet } from '../models';
import { HTTPError } from '../utils';
import { validate as isUUID } from 'uuid';

export class TweetService {
  constructor(
    private tweetRepository: TweetRepository,
    private userRepository: UserRepository,
  ) {}

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

  public async likeTweet(tweetId: string, userId: string) {
    if (!isUUID(tweetId) || !isUUID(userId)) {
      throw new HTTPError(
        400,
        'O userId e tweetId fornecidos devem ser UUIDs válidos.',
      );
    }

    const tweet = await this.tweetRepository.findTweetById(tweetId);

    if (!tweet) {
      throw new HTTPError(404, 'Tweet não foi encontrado.');
    }

    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new HTTPError(404, 'Usuário não foi encontrado.');
    }

    const existingLikeTweet = await this.tweetRepository.findLikes(tweetId);

    if (existingLikeTweet.some((like) => like.userId === userId)) {
      throw new HTTPError(400, 'Você já curtiu este tweet.');
    }

    await this.tweetRepository.likeTweet(tweetId, userId);
  }

  public async unlikeTweet(tweetId: string, userId: string) {
    if (!isUUID(tweetId) || !isUUID(userId)) {
      throw new HTTPError(
        400,
        'O userId e tweetId fornecidos devem ser UUIDs válidos.',
      );
    }

    const tweet = await this.tweetRepository.findTweetById(tweetId);

    if (!tweet) {
      throw new HTTPError(404, 'Tweet não foi encontrado.');
    }

    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new HTTPError(404, 'Usuário não foi encontrado.');
    }

    const existingLikeTweet = await this.tweetRepository.findLikes(tweetId);

    if (!existingLikeTweet.some((like) => like.userId === userId)) {
      throw new HTTPError(400, 'Você não curtiu este tweet.');
    }

    await this.tweetRepository.unlikeTweet(tweetId, userId);
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
