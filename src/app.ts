import { merge } from 'config-plus';
import dotenv from 'dotenv';
import express, { json } from 'express';
import { allow, MiddlewareLogger } from 'express-ext';
import http from 'http';
import { createLogger } from 'logger-core';
import { Pool } from 'pg';
import { PoolManager } from 'pg-extension';
import { config, env } from './config';
import { useContext } from './context';
import { route } from './route';
import  {  Request, Response } from 'express';

dotenv.config();
const conf = merge(config, process.env, env, process.env.ENV);

const app = express();
const logger = createLogger(conf.log);
const middleware = new MiddlewareLogger(logger.info, conf.middleware);
app.use(allow(conf.allow), json(), middleware.log);
// app.use(function(req: Request, res: Response , next) {

//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
//   res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//   next();
// });

const pool = new Pool (conf.db);
const db = new PoolManager(pool);
const ctx = useContext(db, logger, middleware);
route(app, ctx);
http.createServer(app).listen(conf.port, () => {
  console.log('Start server at port ' + conf.port);
});
