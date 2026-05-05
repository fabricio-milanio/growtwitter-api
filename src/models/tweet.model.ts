import { TweetDto } from '../dtos';

export class Tweet {
  constructor(
    private id: string,
    private content: string,
    private userId: string,
    private createdAt: Date,
    private tweetParentId?: string | null,
    private replies?: Tweet[],
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
