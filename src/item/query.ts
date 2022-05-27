import { Statement } from 'query-core';
import { ItemFilter } from './item';

export function buildQuery(item: ItemFilter): Statement {
    let query = `select * from items`;
    const where = [];
    const params = [];
    let i = 1;
    if (item.id && item.id.length > 0) {
      where.push(`id = $${i++}`);
      params.push(item.id);
    }
    if (item.title && item.title.length > 0) {
      where.push(`title ilike $${i++}`);
      params.push('%' + item.title + '%');
    }
    if (item.description && item.description.length > 0) {
      where.push(`description ilike $${i++}`);
      params.push('%' + item.description + '%');
    }

    if (item.q && item.q.length > 0) {
      where.push(`(title ilike $${i++} or description ilike $${i++}) `);
      params.push('%' + item.q + '%');
      params.push('%' + item.q + '%');
    }

    if (where.length > 0) {
      query = query + ` where ` + where.join(' and ');
    }
  return { query, params };
}

