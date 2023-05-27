require('dotenv').config();

const { Client } = require('pg');

const client = new Client({
  database: process.env.DATABASE_NAME,
  port: process.env.DB_PORT,
  host: 'localhost',
  user: 'oneill',
});

client.connect();

module.exports = client;
