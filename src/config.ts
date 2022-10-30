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
    connectionString: 'postgres://mkwgzgli:si8QgTnTNbSlPf8FU7wNmGYF-TK2zH9h@satao.db.elephantsql.com/mkwgzgli'
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
