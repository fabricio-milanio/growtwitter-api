import { CreateUserDto } from '../dtos';
import { prisma } from './prisma.conection';

export class UserRepository {
  constructor() {}

  public async createUser(data: CreateUserDto) {
    return prisma.user.create({
      data: { ...data },
    });
  }

  public async findByEmailOrUsername(email: string, username: string) {
    return await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });
  }
}
