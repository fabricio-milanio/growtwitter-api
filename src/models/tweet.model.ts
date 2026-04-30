import { TweetDto } from '../dtos';

export class Tweet {
  constructor(
    private id: string,
    private content: string,
    private userId: string,
    private tweetParentId: string | null,
    private createdAt: Date,
    private replies?: any[],
  ) {}

  public toJSON(): TweetDto {
    return {
      id: this.id,
      content: this.content,
      userId: this.userId,
      tweetParentId: this.tweetParentId,
      createdAt: this.createdAt,
      replies: this.replies,
    };
  }
}
