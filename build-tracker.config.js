const withPostgres = require('@build-tracker/plugin-with-postgres').default;
module.exports = withPostgres({
  url: 'https://space-qa4.sprinklr.com',
  pg: {
    user: 'myuser',
    password: 'mypassword',
    host: '127.0.0.1',
    database: 'buildtracker'
  }
});
