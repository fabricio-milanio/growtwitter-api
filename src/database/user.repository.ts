import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from '../dtos';

export class UserRepository {
  constructor() {}

  private prisma: PrismaClient = new PrismaClient();

  public async createUser(data: CreateUserDto) {
    return this.prisma.user.create({
      data: { ...data },
    });
  }
}
