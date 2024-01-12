const { Pool } = require('pg');

const {DB_USER, DB_HOST, DB_PASSWORD, DB_PORT, DB_NAME} = process.env;

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});

module.exports = pool;
