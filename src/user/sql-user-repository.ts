import { Search } from 'onecore';
import { DB, Service } from 'query-core';
import { User, UserFilter, userModel, UserService } from './user';

export class SqlUserService extends Service<User, string, UserFilter> implements UserService {
  constructor(find: Search<User, UserFilter>, db: DB) {
    super(find, db, 'users', userModel.attributes);
  }
}
