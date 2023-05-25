-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'question'
--
-- ---

DROP TABLE IF EXISTS `question`;

CREATE TABLE `question` (
  `product_id` INTEGER NULL DEFAULT NULL,
  `question_id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `question_body` MEDIUMTEXT NULL DEFAULT NULL,
  `question_date` DATE NULL DEFAULT NULL,
  `asker_name` MEDIUMTEXT NULL DEFAULT NULL,
  `question_helpfulness` INTEGER NULL DEFAULT NULL,
  `reported` MEDIUMTEXT NULL DEFAULT NULL,
  `product_id_question` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`product_id`, `question_id`)
);

-- ---
-- Table 'answer'
--
-- ---

DROP TABLE IF EXISTS `answer`;

CREATE TABLE `answer` (
  `answer_id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `question_id` INTEGER NULL DEFAULT NULL,
  `body` MEDIUMTEXT NULL DEFAULT NULL,
  `date` DATE NULL DEFAULT NULL,
  `answerer_name` MEDIUMTEXT NULL DEFAULT NULL,
  `helpfulness` INTEGER NULL DEFAULT NULL,
  `photos` INT NULL DEFAULT NULL,
  PRIMARY KEY (`answer_id`, `question_id`)
);

-- ---
-- Table 'products'
--
-- ---

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `product_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`product_id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `question` ADD FOREIGN KEY (question_id) REFERENCES `answer` (`question_id`);
ALTER TABLE `products` ADD FOREIGN KEY (product_id) REFERENCES `question` (`product_id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `question` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `answer` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `products` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `question` (`product_id`,`question_id`,`question_body`,`question_date`,`asker_name`,`question_helpfulness`,`reported`,`product_id_question`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `answer` (`answer_id`,`question_id`,`body`,`date`,`answerer_name`,`helpfulness`,`photos`) VALUES
-- ('','','','','','','');
-- INSERT INTO `products` (`product_id`) VALUES
-- ('');