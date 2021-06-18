SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

DROP DATABASE IF EXISTS `mini_survey_system`
CREATE DATABASE IF NOT EXISTS `mini_survey_system` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mini_survey_system`;

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `comment_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `survey_id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `content` text NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `modified` tinyint(2) NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `comments_ibfk_1` (`survey_id`),
  KEY `comments_ibfk_2` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

TRUNCATE TABLE `comments`;
DROP TABLE IF EXISTS `surveys`;
CREATE TABLE IF NOT EXISTS `surveys` (
  `survey_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `author_id` int(11) UNSIGNED NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `total_viewed` int(11) UNSIGNED DEFAULT 0,
  `total_answered` int(11) UNSIGNED DEFAULT 0,
  PRIMARY KEY (`survey_id`),
  KEY `surveys_ibfk_1` (`author_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

TRUNCATE TABLE `surveys`;
INSERT INTO `surveys` (`survey_id`, `title`, `description`, `author_id`, `time`, `total_viewed`, `total_answered`) VALUES
(1, 'Are you god?', 'A religious question', 1, '2021-05-05 09:45:09', 0, 7),
(2, 'Do you like Kong', 'Do you?', 4, '2021-05-05 09:42:33', 0, 3),
(3, 'Is PPL a hard course?', 'Is it?', 4, '2021-05-05 09:42:29', 0, 2),
(4, 'Back to back or face to face?', '', 4, '2021-05-05 09:42:22', 0, 4),
(5, 'Job', 'Do you like hard job or easy job?', 4, '2021-05-05 09:41:28', 0, 4),
(6, 'Do you watch porns', 'Normal question', 4, '2021-05-05 09:42:15', 0, 5),
(7, 'Do you like Jesus?', '', 5, '2021-05-05 09:42:19', 0, 3);

DROP TABLE IF EXISTS `survey_options`;
CREATE TABLE IF NOT EXISTS `survey_options` (
  `option_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `survey_id` int(11) UNSIGNED NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`option_id`),
  KEY `survey_options_ibfk_1` (`survey_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;

TRUNCATE TABLE `survey_options`;
INSERT INTO `survey_options` (`option_id`, `survey_id`, `description`) VALUES
(1, 1, 'Yes, everybody is god'),
(2, 1, 'No, I\'m not that great'),
(3, 1, 'No, god doesn\'t exist'),
(4, 2, 'Yes'),
(5, 2, 'No'),
(6, 2, 'Okay'),
(7, 3, 'Yes'),
(8, 3, 'No'),
(9, 3, 'Epic but I don\'t know'),
(10, 4, 'Back'),
(11, 4, 'Face'),
(12, 4, 'Facebook'),
(13, 5, 'Hard'),
(14, 5, 'Easy'),
(15, 5, 'Medium'),
(16, 6, 'Yes'),
(17, 6, 'Every day'),
(18, 6, 'Every hour'),
(19, 7, 'Yes'),
(20, 7, 'No'),
(21, 7, 'Jesus Christmas');

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

TRUNCATE TABLE `users`;
INSERT INTO `users` (`user_id`, `email`, `username`, `user_token`) VALUES
(1, 'surf@gmail.com', 'Surf', 'tIRVYkIxEbdfnpzAg4kUQ20RsR72'),
(2, 'pom@gmail.com', 'Pom', '90trE6aPW7hvuLs4AOXujGNVKbK2'),
(3, 'tim@gmail.com', 'Tim', 'iUciHXbMIJddAyDDWDBv0BT6H9B2'),
(4, 'robin@gmail.com', 'Robin', '7ZkS04PEJ7dii2ToJgf8CHpaaZF2'),
(5, 'jesus@gmail.com', 'Jesus', 'iNaHgYlpqMVBHu0ZGmfcjsbBkY62'),
(6, 'jimmy@gmail.com', 'Jimmy', '0OcFMdPzJSeqHeJ6zLWDBGo3Bwp1'),
(7, 'god@gmail.com', 'God', 'HwbPWjxJvGX5lbL289ouh2Yin5A2'),
(8, 'bush@gmail.com', 'Bush', 'FGqJE4UQaGXinizvLm3AIFXQ91f2');

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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4;

TRUNCATE TABLE `user_answers`;
INSERT INTO `user_answers` (`answer_id`, `user_id`, `survey_id`, `option_id`, `time`) VALUES
(1, 2, 1, 2, '2021-05-04 20:43:32'),
(2, 3, 1, 2, '2021-05-04 22:22:37'),
(3, 4, 5, 15, '2021-05-05 09:37:10'),
(4, 3, 6, 17, '2021-05-05 09:37:28'),
(5, 3, 4, 12, '2021-05-05 09:37:34'),
(6, 5, 6, 18, '2021-05-05 09:38:03'),
(7, 5, 2, 4, '2021-05-05 09:38:10'),
(8, 5, 5, 14, '2021-05-05 09:38:13'),
(9, 5, 1, 3, '2021-05-05 09:39:17'),
(10, 6, 6, 17, '2021-05-05 09:40:39'),
(11, 6, 7, 20, '2021-05-05 09:40:09'),
(12, 6, 4, 10, '2021-05-05 09:40:12'),
(13, 6, 5, 14, '2021-05-05 09:40:16'),
(14, 6, 1, 2, '2021-05-05 09:40:28'),
(15, 6, 2, 6, '2021-05-05 09:40:34'),
(16, 6, 3, 8, '2021-05-05 09:40:36'),
(17, 7, 6, 18, '2021-05-05 09:41:17'),
(18, 7, 7, 20, '2021-05-05 09:41:21'),
(19, 7, 4, 12, '2021-05-05 09:41:24'),
(20, 7, 5, 15, '2021-05-05 09:41:28'),
(21, 7, 1, 1, '2021-05-05 09:41:31'),
(22, 4, 1, 1, '2021-05-05 09:42:10'),
(23, 4, 6, 17, '2021-05-05 09:42:15'),
(24, 4, 7, 21, '2021-05-05 09:42:19'),
(25, 4, 4, 11, '2021-05-05 09:42:22'),
(26, 4, 3, 7, '2021-05-05 09:42:29'),
(27, 4, 2, 4, '2021-05-05 09:42:39'),
(28, 8, 1, 1, '2021-05-05 09:45:09');
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
