const withPostgres = require('@build-tracker/plugin-with-postgres').default;
module.exports = withPostgres({
  url: '127.0.0.1:3000',
  pg: {
    user: 'myuser',
    password: 'mypassword',
    host: '127.0.0.1',
    database: 'buildtracker'
  }
});
