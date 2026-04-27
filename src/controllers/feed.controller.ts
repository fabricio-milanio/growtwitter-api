import { Request, Response } from 'express';
import { onError } from '../utils';

export class FeedController {
  public async createFeed(req: Request, res: Response) {
    try {
    } catch (error) {
      onError(error, res);
    }
  }
}
