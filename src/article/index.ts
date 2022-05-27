import { Log, Manager, Search } from 'onecore';
import { DB, postgres, SearchBuilder } from 'query-core';
import { buildQuery } from './query';
import { Article, ArticleFilter, articleModel, ArticleRepository, ArticleService } from './article';
import { ArticleController } from './article-controller';
export * from './article';
export { ArticleController };
import { SqlArticleRepository } from './sql-article-reponsitory';

export class ArticleManager extends Manager<Article, string, ArticleFilter> implements ArticleService {
  constructor(search: Search<Article, ArticleFilter>, repository: ArticleRepository) {
    super(search, repository);
  }
}
export function useArticleService(db: DB): ArticleService {
  const builder = new SearchBuilder<Article, ArticleFilter>(db.query, 'articles', articleModel, postgres, buildQuery);
  const repository = new SqlArticleRepository(db);
  return new ArticleManager(builder.search, repository);
}
export function useArticleController(log: Log, db: DB): ArticleController {
  return new ArticleController(log, useArticleService(db));
}
