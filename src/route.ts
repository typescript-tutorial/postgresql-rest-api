import { Application } from 'express';
import { ApplicationContext } from './context';

export function route(app: Application, ctx: ApplicationContext): void {
  app.get('/health', ctx.health.check);
  app.patch('/log', ctx.log.config);
  app.patch('/middleware', ctx.middleware.config);

  app.post('/users/search', ctx.user.search);
  app.get('/users/search', ctx.user.search);
  app.get('/users/:id', ctx.user.load);
  app.post('/users', ctx.user.create);
  app.put('/users/:id', ctx.user.update);
  app.patch('/users/:id', ctx.user.patch);
  app.delete('/users/:id', ctx.user.delete);

  app.get('/items/:id',     ctx.item.load);
  app.post('/items',        ctx.item.create);
  app.put('/items/:id',     ctx.item.update);
  app.delete('/items/:id',  ctx.item.delete);
  app.get('/items/search',  ctx.item.search);
  app.post('/items/search', ctx.item.search);

  app.get('/articles/:id',     ctx.article.load);
  app.post('/articles',        ctx.article.create);
  app.put('/articles/:id',     ctx.article.update);
  app.delete('/articles/:id',  ctx.article.delete);
  app.get('/articles/search',  ctx.article.search);
  app.post('/articles/search', ctx.article.search);
}
