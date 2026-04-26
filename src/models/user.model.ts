import { UserDto } from '../dtos';

export class User {
  constructor(
    private id: string,
    private name: string,
    private username: string,
    private email: string,
    private profileImage: string,
    private createdAt: Date,
    private updatedAt: Date,
  ) {}

  public toJSON(): UserDto {
    return {
      id: this.id,
      name: this.name,
      username: this.username,
      email: this.email,
      profileImage: this.profileImage,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
