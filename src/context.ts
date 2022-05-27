import { HealthController, LogController, Logger, Middleware, MiddlewareController, resources } from 'express-ext';
import { createChecker, DB } from 'query-core';
import { createValidator } from 'xvalidators';
import { UserController, useUserController } from './user';
import { ItemController,  useItemController } from './item';
import { ArticleController,  useArticleController } from './article';

resources.createValidator = createValidator;

export interface ApplicationContext {
  health: HealthController;
  log: LogController;
  middleware: MiddlewareController;
  user: UserController;
  item: ItemController;
  article: ArticleController;
}
export function useContext(db: DB, logger: Logger, midLogger: Middleware): ApplicationContext {
  const log = new LogController(logger);
  const middleware = new MiddlewareController(midLogger);
  const sqlChecker = createChecker(db);
  const health = new HealthController([sqlChecker]);

  const user = useUserController(logger.error, db);
  const item = useItemController(logger.error, db);
  const article = useArticleController(logger.error, db);

  return { health, log, middleware, user, item, article};
}
