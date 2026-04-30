import { Tweet } from '../models';

export interface TweetDto {
  id: string;
  content: string;
  userId: string;
  createdAt: Date;
  tweetParentId?: string | null;
  replies?: Tweet[];
}

export interface CreateTweetDto {
  content: string;
  userId: string;
  tweetParentId?: string | null;
}
