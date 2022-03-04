import { HealthController, LogController, Logger, Middleware, MiddlewareController, resources } from 'express-ext';
import { createChecker, DB } from 'query-core';
import { postgres, SearchBuilder} from 'query-core';
import { createValidator } from 'xvalidators';
import { buildQuery, SqlUserService, User, UserController, UserFilter, userModel } from './user';

resources.createValidator = createValidator;

export interface ApplicationContext {
  health: HealthController;
  log: LogController;
  middleware: MiddlewareController;
  user: UserController;
}
export function useContext(db: DB, logger: Logger, midLogger: Middleware): ApplicationContext {
  const log = new LogController(logger);
  const middleware = new MiddlewareController(midLogger);
  const sqlChecker = createChecker(db);
  const health = new HealthController([sqlChecker]);

  const userSearchBuilder = new SearchBuilder<User, UserFilter>(db.query, 'users', userModel.attributes, postgres, buildQuery);
  const userService = new SqlUserService(userSearchBuilder.search, db);
  const user = new UserController(logger.error, userService);

  return { health, log, middleware, user };
}
