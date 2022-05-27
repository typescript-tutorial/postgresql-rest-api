import { Controller, Log } from 'express-ext';
import { Article, ArticleFilter, ArticleService } from './article';

export class ArticleController extends Controller<Article, string, ArticleFilter> {
  constructor(log: Log, articleService: ArticleService) {
    super(log, articleService);
  }
}