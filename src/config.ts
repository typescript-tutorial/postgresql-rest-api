export const config = {
  port: 9000,
  allow: {
    origin: 'http://localhost:3000',
    credentials: 'true',
    methods: 'GET,PUT,POST,DELETE,OPTIONS,PATCH',
    headers: 'Access-Control-Allow-Headers, Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  },
  log: {
    level: 'info',
    map: {
      time: '@timestamp',
      msg: 'message'
    }
  },
  middleware: {
    log: true,
    skips: 'health,log,middleware',
    request: 'request',
    response: 'response',
    status: 'status',
    size: 'size'
  },
  db: {
    user: 'postgres',
    host: 'localhost',
    password: '12345678@Z',
    database: 'study-postgres',
    port: 5432
  }
};

export const env = {
  sit: {
    port: 9000,
    db: {
      database: 'study-postgres',
    }
  },
  prod: {
    middleware: {
      log: false
    }
  }
};
