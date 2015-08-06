var servers = exports.servers = {
  listen: 3000,
  fetch_lines: 1000,
  query_timeout: null, // seconds. (null:shib will wait query response infinitely).
  setup_queries: [],
  storage: {
    datadir: './var'
  },
  auth: {
    type: 'dict_auth',
    dict_file: './passwd'
  },
  executer: {
    name: 'hiveserver2', // or 'hiveserver2', 'presto'
    host: 'localhost',
    port: 10001,
    support_database: true,
    default_database: 'default'
  },
  monitor: null
  /*
  monitor: {
    name : 'huahin_mrv1', // or 'presto'
    host: 'localhost',
    port: 9010
  }
  */
};
