import {HealthController} from 'express-ext';
import {UserController} from './user/UserController';

export interface ApplicationContext {
  health: HealthController;
  user: UserController;
}
