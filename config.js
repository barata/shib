var servers = exports.servers = {
  listen: 80,
  fetch_lines: 1000,
  query_timeout: null, // seconds. (null:shib will wait query response infinitely).
  setup_queries: [],
  storage: {
    datadir: "/mnt/hadoop/shib"
  },
  auth: {
    type: 'dict_auth',
    dict_file: '/opt/shib/passwd'
  },
  executer: {
    name: 'hiveserver2',
    host: 'hive.platform.chaordicsystems.com',
    port: 10001,
    support_database: true,
    default_database: 'default'
  },
  monitor: null
};
