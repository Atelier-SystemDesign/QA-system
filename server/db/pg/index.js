require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  database: process.env.DATABASE_NAME,
  port: process.env.DB_PORT,
  host: 'localhost',
  user: 'oneill',
});

pool.connect();

module.exports = pool;
