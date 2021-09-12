import {HealthController} from 'express-ext';
import {Pool} from 'pg';
import {PoolManager, PostgreSQLChecker} from 'postgre';
import {postgre, SearchBuilder} from 'query-core';
import {ApplicationContext} from './context';
import {UserController} from './controllers/UserController';
import {userModel} from './metadata/UserModel';
import {User} from './models/User';
import {UserSM} from './search-models/UserSM';
import {SqlUserService} from './services/sql/SqlUserService';

export function log(msg: any, ctx?: any): void {
  console.log(msg);
}
export function createContext(pool: Pool): ApplicationContext {
  const sqlChecker = new PostgreSQLChecker(pool);
  const health = new HealthController([sqlChecker]);
  const manager = new PoolManager(pool);
  const builder = new SearchBuilder<User, UserSM>(manager.query, 'users', userModel.attributes, postgre);
  const userService = new SqlUserService(pool);
  const user = new UserController(builder.search, userService, log);
  const ctx: ApplicationContext = {health, user};
  return ctx;
}
