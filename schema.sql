-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'question'
--
-- ---

DROP TABLE IF EXISTS question;

CREATE TABLE question (
  question_id INT,
  product_id INT,
  question_body TEXT,
  question_date BIGINT,
  asker_name TEXT,
  asker_email TEXT,
  reported INT,
  question_helpfulness INT,
  PRIMARY KEY (question_id)
);

-- ---
-- Table answer
--
-- ---

DROP TABLE IF EXISTS answer;

CREATE TABLE answer (
  id INT,
  question_id INT,
  answer_body TEXT,
  answer_date_written BIGINT,
  answerer_name TEXT,
  answerer_email TEXT NOT NULL,
  answer_reported INT,
  answer_helpful INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table photo
--
-- ---

DROP TABLE IF EXISTS photo;

CREATE TABLE photo (
  id INT,
  answer_id INT,
  url TEXT,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE answer ADD FOREIGN KEY (question_id) REFERENCES question (id);
ALTER TABLE photo ADD FOREIGN KEY (answer_id) REFERENCES answer (id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `question` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `answer` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `photo` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

COPY question(id,product_id,body,date_written,asker_name,asker_email,reported,helpful)
  FROM '/Users/oneill/hackreactor/repos/SDC/questions-answers-system/CSVfiles/questions.csv'
  WITH(DELIMITER ',', FORMAT CSV, HEADER, NULL '');

COPY answer(id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful)
  FROM '/Users/oneill/hackreactor/repos/SDC/questions-answers-system/CSVfiles/answers.csv'
  WITH(DELIMITER ',', FORMAT CSV, HEADER, NULL '');

COPY photo(id,answer_id,url)
  FROM '/Users/oneill/hackreactor/repos/SDC/questions-answers-system/CSVfiles/answers_photos.csv'
  WITH(DELIMITER ',', FORMAT CSV, HEADER, NULL '');

-- INSERT INTO question (id, product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES
-- ('', '', '', '', '', '', '', '');
-- INSERT INTO answer (id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES
-- ('', '', '', '', '', '', '');
-- INSERT INTO photo (id, answer_id, url) VALUES
-- ('', '', '');

-- UPDATE answer
-- SET answerer_name=''
-- WHERE canswerer_name='null';
