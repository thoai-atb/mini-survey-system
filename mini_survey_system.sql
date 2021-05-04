SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `mini_survey_system` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mini_survey_system`;

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `comment_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `survey_id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`comment_id`),
  KEY `comments_ibfk_1` (`survey_id`),
  KEY `comments_ibfk_2` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `surveys`;
CREATE TABLE IF NOT EXISTS `surveys` (
  `survey_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `author_id` int(11) UNSIGNED NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `total_viewed` int(11) UNSIGNED DEFAULT 0,
  `total_answered` int(11) UNSIGNED DEFAULT 0,
  PRIMARY KEY (`survey_id`),
  KEY `surveys_ibfk_1` (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `survey_options`;
CREATE TABLE IF NOT EXISTS `survey_options` (
  `option_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `survey_id` int(11) UNSIGNED NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`option_id`),
  KEY `survey_options_ibfk_1` (`survey_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `username` varchar(20) NOT NULL,
  `user_token` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `user_token` (`user_token`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `user_answers`;
CREATE TABLE IF NOT EXISTS `user_answers` (
  `answer_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) UNSIGNED NOT NULL,
  `survey_id` int(11) UNSIGNED NOT NULL,
  `option_id` int(11) UNSIGNED NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`answer_id`),
  UNIQUE KEY `unique_user_answers` (`user_id`,`survey_id`),
  KEY `user_answers_ibfk_1` (`user_id`),
  KEY `user_answers_ibfk_2` (`survey_id`),
  KEY `user_answers_ibfk_3` (`option_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
DROP TRIGGER IF EXISTS `decrease_total_answered`;
DELIMITER $$
CREATE TRIGGER `decrease_total_answered` AFTER DELETE ON `user_answers` FOR EACH ROW UPDATE surveys 
SET surveys.total_answered = surveys.total_answered - 1 WHERE surveys.survey_id = OLD.survey_id
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `increase_total_answered`;
DELIMITER $$
CREATE TRIGGER `increase_total_answered` AFTER INSERT ON `user_answers` FOR EACH ROW UPDATE surveys 
SET surveys.total_answered = surveys.total_answered + 1 WHERE surveys.survey_id = NEW.survey_id
$$
DELIMITER ;


ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`survey_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `surveys`
  ADD CONSTRAINT `surveys_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `survey_options`
  ADD CONSTRAINT `survey_options_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`survey_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `user_answers`
  ADD CONSTRAINT `user_answers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_answers_ibfk_2` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`survey_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_answers_ibfk_3` FOREIGN KEY (`option_id`) REFERENCES `survey_options` (`option_id`) ON DELETE CASCADE ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
