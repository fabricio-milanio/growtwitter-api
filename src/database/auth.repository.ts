import { LoginDto } from '../dtos';
import { prisma } from './prisma.conection';

export class AuthRepository {
  constructor() {}

  public async login(data: LoginDto) {
    return prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
  }
}
