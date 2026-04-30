export interface TweetDto {
  id: string;
  content: string;
  userId: string;
  tweetParentId?: string | null;
  createdAt: Date;
  replies?: any[];
}
