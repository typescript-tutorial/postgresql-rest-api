import { Attributes, Filter, Repository, Service } from 'onecore';

export interface Article {
    id: string;
    title?: string;
    description?: string;
}

export interface ArticleFilter extends Filter {
    id: string;
    title?: string;
    description?: string;
}
export interface ArticleRepository extends Repository<Article, string> {
}
export interface ArticleService extends Service<Article, string, ArticleFilter> {
}

export const articleModel: Attributes = {
    id: {
      key: true,
      match: 'equal'
    },
    title: {},
    description: {}
};