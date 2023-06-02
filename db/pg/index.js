require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  database: process.env.DB_NAME,
  port: process.env.PG_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20,
});

pool.connect();

module.exports = pool;
