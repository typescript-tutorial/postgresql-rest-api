import { Statement } from 'query-core';
import { ArticleFilter } from './article';

export function buildQuery(article: ArticleFilter): Statement {
    let query = `select * from articles`;
    const where = [];
    const params = [];
    let i = 1;
    if (article.id && article.id.length > 0) {
      where.push(`id = $${i++}`);
      params.push(article.id);
    }
    if (article.title && article.title.length > 0) {
      where.push(`title ilike $${i++}`);
      params.push('%' + article.title + '%');
    }
    if (article.description && article.description.length > 0) {
      where.push(`description ilike $${i++}`);
      params.push('%' + article.description + '%');
    }

    if (article.q && article.q.length > 0) {
      where.push(`(title ilike $${i++} or description ilike $${i++}) `);
      params.push('%' + article.q + '%');
      params.push('%' + article.q + '%');
    }

    if (where.length > 0) {
      query = query + ` where ` + where.join(' and ');
    }
  return { query, params };
}

