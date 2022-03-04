export const config = {
  port: 8082,
  allow: {
    origin: '*',
    credentials: 'true',
    methods: 'GET,PUT,POST,DELETE,OPTIONS,PATCH',
    headers: '*'
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
    password: 'abcd1234',
    database: 'masterdata2',
    port: 5432
  }
};

export const env = {
  sit: {
    port: 8082,
    db: {
      database: 'masterdata_sit',
    }
  },
  prod: {
    middleware: {
      log: false
    }
  }
};
