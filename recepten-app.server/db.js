const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'mysecretpassword',
    database: 'test',
    port: 5432,
  },
})

module.exports = knex
