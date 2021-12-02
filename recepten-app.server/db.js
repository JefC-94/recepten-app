const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: 'ID348579_testapp.db.webhosting.be',
    user: 'ID348579_testapp',
    password: 'test1234',
    database: 'ID348579_testapp',
    port: 3306,
  },
})

module.exports = knex
