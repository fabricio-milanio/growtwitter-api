import { UserController } from '../controllers';
import { UserService } from '../services';
import { UserRepository } from './../database';

export const userRepository = new UserRepository();
const userService = new UserService(userRepository);
export const userController = new UserController(userService);
