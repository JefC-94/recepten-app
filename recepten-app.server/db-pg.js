const { Pool, Client } = require('pg')

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'mysecretpassword',
  database: 'test',
  port: 5432,
})

module.exports = pool
