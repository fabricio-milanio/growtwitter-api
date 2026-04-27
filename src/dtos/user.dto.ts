export interface UserDto {
  id: string;
  name: string;
  username: string;
  email: string;
  profileImage: string;
  tweets?: any[];
  followers?: any[];
  following?: any[];
  stats?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  name: string;
  username: string;
  email: string;
  password: string;
  profileImage: string;
}
