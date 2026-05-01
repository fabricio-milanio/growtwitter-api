import { TweetRepository, UserRepository } from '../database';
import { CreateUserDto } from '../dtos';
import { User } from '../models';
import * as bcrypt from 'bcrypt';
import { HTTPError } from '../utils';

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private tweetRepository: TweetRepository,
  ) {}

  public async createUser(dto: CreateUserDto): Promise<User> {
    const userAlreadyExists =
      await this.userRepository.findUserByEmailOrUsername(
        dto.email,
        dto.username,
      );

    if (userAlreadyExists) {
      const message =
        userAlreadyExists.email === dto.email
          ? 'Este e-mail já está em uso.'
          : 'Este nome de usuário já está em uso.';

      throw new HTTPError(400, message);
    }

    const encryptedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = await this.userRepository.createUser({
      ...dto,
      password: encryptedPassword,
    });

    return this.mapToModel(newUser);
  }

  public async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new HTTPError(404, 'Usuário não encontrado.');
    }

    return this.mapToModel(user);
  }

  public async getUserProfile(id: string): Promise<User> {
    const user = await this.userRepository.findUserById(id);
    const following = await this.userRepository.findUsersFollowing(id);
    const followers = await this.userRepository.findUsersFollowers(id);
    const userTweets = await this.tweetRepository.findTweetsByUserId(id);

    if (!user) {
      throw new HTTPError(404, 'Usuário não encontrado.');
    }

    return this.mapToModel({
      ...user,
      following,
      followers,
      tweets: userTweets,
    });
  }

  //Cria o feed do usuário, juntando seus tweets com os tweets dos usuários que ele segue'
  public async getUserFeed(userId: string): Promise<User> {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new HTTPError(404, 'Usuário não encontrado.');
    }

    const following = await this.userRepository.findUsersFollowing(userId);
    const followingUserId = following.map((f) => f.followingId);
    console.log(followingUserId);
    const userTweets = await this.tweetRepository.findTweetsByUserId(userId);
    const followingTweets = (
      await Promise.all(
        followingUserId.map(async (id) => {
          return await this.tweetRepository.findTweetsByUserId(id);
        }),
      )
    ).flat();

    console.log(followingTweets);

    return this.mapToModel({
      ...user,
      tweets: [...userTweets, ...followingTweets],
    });
  }

  public async followUser(followerId: string, followingId: string) {
    if (followerId === followingId) {
      throw new HTTPError(400, 'Você não pode seguir a si mesmo.');
    }

    const profileUser = await this.userRepository.findUserById(followerId);

    if (!profileUser) {
      throw new HTTPError(404, 'Usuário alvo não encontrado.');
    }

    const alreadyFollows = await this.userRepository.findUserFollow(
      followerId,
      followingId,
    );

    if (alreadyFollows) {
      throw new HTTPError(404, 'Você já segue este usuário.');
    }

    await this.userRepository.followUser(followerId, followingId);
    return {
      followed: true,
      message: 'Agora você está seguindo este usuário.',
    };
  }

  public async unfollowUser(followerId: string, followingId: string) {
    const profileUser = await this.userRepository.findUserById(followerId);

    if (!profileUser) {
      throw new HTTPError(404, 'Usuário alvo não encontrado.');
    }

    const alreadyFollows = await this.userRepository.findUserFollow(
      followerId,
      followingId,
    );

    if (!alreadyFollows) {
      throw new HTTPError(404, 'Você não segue este usuário.');
    }

    await this.userRepository.unfollowUser(followerId, followingId);
    return {
      followed: true,
      message: 'Você deixou de seguir este usuário.',
    };
  }

  private mapToModel(entity: any): User {
    return new User(
      entity.id,
      entity.name,
      entity.username,
      entity.email,
      entity.profileImage,
      entity.createdAt,
      entity.updatedAt,
      entity.tweets?.map((t: any) => t),
      entity.followers?.map((f: any) => f.follower),
      entity.following?.map((f: any) => f.following),
      entity._count,
    );
  }
}
