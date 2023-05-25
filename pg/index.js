require('dotenv').config();

const { Client } = require('pg');

const client = new Client({
  database: process.env.DATABASE_NAME,
  port: process.env.PORT,
  host: 'localhost',
  user: 'oneill',
});

client.connect()
  .then(() => client.query(`
    CREATE TABLE IF NOT EXISTS question (
      id INT PRIMARY KEY,
      product_id INT,
      body TEXT,
      date_written BIGINT,
      asker_name TEXT,
      asker_email TEXT,
      reported INT,
      helpful INT
    );
  `))
  .then(() => client.query(`
    CREATE TABLE IF NOT EXISTS answer (
      id INT PRIMARY KEY,
      question_id INT,
      body TEXT,
      date_written BIGINT,
      answerer_name TEXT,
      answerer_email TEXT,
      reported INT,
      helpful INT,

      FOREIGN KEY (question_id) REFERENCES question(id)
    );
  `))
  .then(() => client.query(`
    CREATE TABLE IF NOT EXISTS photo (
      id INT PRIMARY KEY,
      answer_id INT,
      url TEXT,

      FOREIGN KEY (answer_id) REFERENCES answer(id)
    );
  `))
  .then(() => client.query(`
    COPY question(id,product_id,body,date_written,asker_name,asker_email,reported,helpful)
    FROM '/Users/oneill/hackreactor/repos/SDC/questions-answers-system/CSVfiles/questions.csv'
    DELIMITER ',' CSV HEADER;
  `))
  .then(() => client.query(`
    COPY answer(id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful)
    FROM '/Users/oneill/hackreactor/repos/SDC/questions-answers-system/CSVfiles/answers.csv'
    DELIMITER ',' CSV HEADER;
  `))
  .then(() => client.query(`
    COPY photo(id,answer_id,url)
    FROM '/Users/oneill/hackreactor/repos/SDC/questions-answers-system/CSVfiles/answers_photos.csv'
    DELIMITER ',' CSV HEADER;
  `))
  .then(() => {
    console.log('tables created');
    client.end(); // close connection
  })
  .catch((err) => {
    console.log('query error', err.message);
    client.end();
  });
