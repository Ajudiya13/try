const withPostgres = require('@build-tracker/plugin-with-postgres').default;
module.exports = withPostgres({
  url: 'https://your-build-tracker-app',
  pg: {
    user: 'myuser',
    password: 'mypassword',
    host: '127.0.0.1',
    database: 'buildtracker'
  }
});
