-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2021 at 04:52 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mini_survey_system`
--
CREATE DATABASE IF NOT EXISTS `mini_survey_system` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mini_survey_system`;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `comment_id` int(11) UNSIGNED NOT NULL,
  `survey_id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `content` text NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `modified` tinyint(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `survey_id`, `user_id`, `content`, `time`, `modified`) VALUES
(11, 8, 1, 'I like green because I see trees are green.', '2021-06-19 08:47:06', 0),
(12, 9, 1, 'I chose Youtube cuz it has quality contents', '2021-06-19 08:48:23', 0),
(13, 11, 1, 'Regular feels better', '2021-06-19 08:48:46', 0),
(14, 9, 2, 'Everybody uses Facebook', '2021-06-19 09:09:14', 0),
(15, 15, 2, 'Hey you\'d better off study, kid', '2021-06-19 09:10:18', 0),
(16, 8, 8, 'And red roses too (I love red)', '2021-06-19 09:17:54', 0),
(17, 9, 8, 'Where\'s WeChat?', '2021-06-19 09:18:29', 0),
(18, 15, 8, 'Civil War, it was a civil war, in the United States fought between northern and Pacific states and southern states that voted to secede and form the Confederate States of America', '2021-06-19 09:19:22', 0),
(19, 11, 8, 'I agree!', '2021-06-19 09:19:58', 0),
(20, 17, 8, 'Can you write the details, I don\'t know what those quadrants mean', '2021-06-19 09:21:36', 0),
(21, 19, 6, 'I am grateful of you, God', '2021-06-19 09:36:05', 0),
(22, 16, 6, 'Classical songs are beautiful, they help me relaxed and calm', '2021-06-19 09:43:07', 0),
(23, 13, 6, 'What\'s rhombic dodecahedron, idk', '2021-06-19 09:44:12', 0),
(24, 22, 1, 'I like surfing the best but it is not listed here', '2021-06-19 09:49:52', 0);

-- --------------------------------------------------------

--
-- Table structure for table `surveys`
--

DROP TABLE IF EXISTS `surveys`;
CREATE TABLE `surveys` (
  `survey_id` int(11) UNSIGNED NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `author_id` int(11) UNSIGNED NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `total_viewed` int(11) UNSIGNED DEFAULT 0,
  `total_answered` int(11) UNSIGNED DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `surveys`
--

INSERT INTO `surveys` (`survey_id`, `title`, `description`, `author_id`, `time`, `total_viewed`, `total_answered`) VALUES
(8, 'What is Your Favorite Color?', 'Please choose your favorite color.', 1, '2021-06-19 08:35:46', 0, 6),
(9, 'Social Media', 'Choose the one you use the most.', 1, '2021-06-19 08:38:28', 0, 6),
(10, 'Are you gay?', 'Answer honestly', 1, '2021-06-19 08:41:25', 0, 0),
(11, 'Decaf or Regular?', 'Which do you drink?', 1, '2021-06-19 08:45:54', 0, 6),
(12, 'Do You Watch Porns?', '', 4, '2021-06-19 08:51:52', 0, 0),
(13, 'Choose the Shape of Your Life', 'What does your life look like?', 4, '2021-06-19 08:54:07', 0, 5),
(14, 'What Would You Do If You Are Depressed?', 'There are many ways of dealing with depression. In this survey I want to see what the public says about the solution.', 4, '2021-06-19 08:59:57', 0, 7),
(15, 'Help, Can you do my homework please?', 'I have to submit my homework tomorrow, and I don\'t know how to do it so I post it here: Which war was fought between the north and the south regions of the United States?\n', 4, '2021-06-19 09:05:49', 0, 6),
(16, 'Music Genres', 'What kind of music do you like to listen to?', 2, '2021-06-19 09:12:43', 0, 6),
(17, 'Personality Types', 'Which quadrant do you belong to?', 2, '2021-06-19 09:16:10', 0, 5),
(18, 'Are you god?', '', 7, '2021-06-19 09:23:16', 0, 4),
(19, 'God\'s Characteristics', '', 7, '2021-06-19 09:26:07', 0, 4),
(20, 'Which Best Describes Your Emotion?', '', 3, '2021-06-19 09:31:09', 0, 2),
(21, 'How often do you use your phone?', 'I need this survey to complete my research', 3, '2021-06-19 09:32:52', 0, 2),
(22, 'Leisure Activities', 'What do you do in your free time?', 6, '2021-06-19 09:41:59', 0, 2);

-- --------------------------------------------------------

--
-- Table structure for table `survey_options`
--

DROP TABLE IF EXISTS `survey_options`;
CREATE TABLE `survey_options` (
  `option_id` int(11) UNSIGNED NOT NULL,
  `survey_id` int(11) UNSIGNED NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `survey_options`
--

INSERT INTO `survey_options` (`option_id`, `survey_id`, `description`) VALUES
(22, 8, 'Red'),
(23, 8, 'Orange'),
(24, 8, 'Yellow'),
(25, 8, 'Green'),
(26, 8, 'Blue'),
(27, 8, 'Purple'),
(28, 8, 'Magenta'),
(29, 8, 'Black'),
(30, 8, 'White'),
(31, 9, 'Facebook'),
(32, 9, 'Youtube'),
(33, 9, 'Twitter'),
(34, 9, 'Instagram'),
(35, 9, 'Tiktok'),
(36, 9, 'Snapchat'),
(37, 10, 'Yes'),
(38, 10, 'No'),
(39, 10, 'I am not gay but people think I am so I don\'t know I\'m gay or not'),
(40, 11, 'Decaf'),
(41, 11, 'Regular'),
(42, 12, 'Yes'),
(43, 12, 'Every Day'),
(44, 12, 'Every Hour'),
(45, 12, 'Every Second I\'m Alive'),
(46, 13, 'A Circle'),
(47, 13, 'A Square'),
(48, 13, 'A Line'),
(49, 13, 'A Rhombic Dodecahedron'),
(50, 14, 'Weed'),
(51, 14, 'Strip Clubs'),
(52, 14, 'Casino'),
(53, 14, 'I keep studying to become a good person and help my nation becoming a better place'),
(54, 15, 'Civil War'),
(55, 15, 'Mexican War'),
(56, 15, 'World War I'),
(57, 15, 'World War II'),
(58, 16, 'Pop'),
(59, 16, 'Rock'),
(60, 16, 'Disco'),
(61, 16, 'Classical'),
(62, 16, 'Country & Blues'),
(63, 16, 'Russian'),
(64, 17, 'A'),
(65, 17, 'B'),
(66, 17, 'C'),
(67, 17, 'D'),
(68, 18, 'Yes, everybody is god'),
(69, 18, 'No'),
(70, 18, 'I love god'),
(71, 19, 'I am Omnipotence, Omnibenevolence, Omniscience, and Omnipresence'),
(72, 20, 'Wood'),
(73, 20, 'Steel'),
(74, 20, 'Water'),
(75, 20, 'Dirt'),
(76, 20, 'Balloon'),
(77, 21, 'Every minute'),
(78, 21, 'Once every hour'),
(79, 21, 'I use my laptop more frequent'),
(80, 21, 'I don\'t have a phone'),
(81, 22, 'I read books'),
(82, 22, 'I play video games'),
(83, 22, 'I hang out with my friends'),
(84, 22, 'I use WBTB technique for Astral Projection');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int(11) UNSIGNED NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(20) NOT NULL,
  `user_token` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `username`, `user_token`) VALUES
(1, 'surf@gmail.com', 'Surf', 'tIRVYkIxEbdfnpzAg4kUQ20RsR72'),
(2, 'pom@gmail.com', 'Pom', '90trE6aPW7hvuLs4AOXujGNVKbK2'),
(3, 'tim@gmail.com', 'Tim', 'iUciHXbMIJddAyDDWDBv0BT6H9B2'),
(4, 'robin@gmail.com', 'Robin', '7ZkS04PEJ7dii2ToJgf8CHpaaZF2'),
(5, 'jesus@gmail.com', 'Jesus', 'iNaHgYlpqMVBHu0ZGmfcjsbBkY62'),
(6, 'jimmy@gmail.com', 'Jimmy', '0OcFMdPzJSeqHeJ6zLWDBGo3Bwp1'),
(7, 'god@gmail.com', 'God', 'HwbPWjxJvGX5lbL289ouh2Yin5A2'),
(8, 'bush@gmail.com', 'Bush', 'FGqJE4UQaGXinizvLm3AIFXQ91f2');

-- --------------------------------------------------------

--
-- Table structure for table `user_answers`
--

DROP TABLE IF EXISTS `user_answers`;
CREATE TABLE `user_answers` (
  `answer_id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `survey_id` int(11) UNSIGNED NOT NULL,
  `option_id` int(11) UNSIGNED NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_answers`
--

INSERT INTO `user_answers` (`answer_id`, `user_id`, `survey_id`, `option_id`, `time`) VALUES
(29, 1, 8, 25, '2021-06-19 08:46:39'),
(30, 1, 9, 32, '2021-06-19 08:47:25'),
(31, 1, 11, 41, '2021-06-19 08:48:36'),
(32, 4, 14, 50, '2021-06-19 09:02:02'),
(33, 4, 15, 54, '2021-06-19 09:08:04'),
(34, 4, 13, 46, '2021-06-19 09:08:24'),
(35, 2, 9, 31, '2021-06-19 09:09:02'),
(36, 2, 11, 40, '2021-06-19 09:09:25'),
(37, 2, 8, 28, '2021-06-19 09:09:35'),
(38, 2, 13, 48, '2021-06-19 09:09:41'),
(39, 2, 14, 52, '2021-06-19 09:09:49'),
(40, 2, 15, 54, '2021-06-19 09:09:53'),
(41, 2, 17, 67, '2021-06-19 09:16:18'),
(42, 2, 16, 58, '2021-06-19 09:16:36'),
(43, 8, 8, 22, '2021-06-19 09:17:30'),
(44, 8, 9, 31, '2021-06-19 09:18:18'),
(45, 8, 15, 54, '2021-06-19 09:18:40'),
(46, 8, 11, 41, '2021-06-19 09:19:53'),
(47, 8, 16, 59, '2021-06-19 09:20:07'),
(48, 8, 13, 46, '2021-06-19 09:20:20'),
(49, 8, 14, 51, '2021-06-19 09:20:36'),
(50, 7, 18, 70, '2021-06-19 09:23:38'),
(51, 7, 19, 71, '2021-06-19 09:26:18'),
(52, 7, 15, 55, '2021-06-19 09:26:46'),
(53, 7, 8, 30, '2021-06-19 09:26:54'),
(54, 7, 16, 58, '2021-06-19 09:27:04'),
(55, 7, 13, 49, '2021-06-19 09:27:11'),
(56, 7, 14, 53, '2021-06-19 09:27:19'),
(57, 7, 11, 40, '2021-06-19 09:27:27'),
(58, 7, 17, 64, '2021-06-19 09:27:34'),
(59, 7, 9, 33, '2021-06-19 09:27:48'),
(60, 5, 8, 23, '2021-06-19 09:28:16'),
(61, 5, 9, 31, '2021-06-19 09:28:28'),
(62, 5, 11, 40, '2021-06-19 09:28:40'),
(63, 5, 15, 54, '2021-06-19 09:28:45'),
(64, 5, 19, 71, '2021-06-19 09:28:50'),
(65, 5, 18, 70, '2021-06-19 09:28:56'),
(66, 5, 16, 60, '2021-06-19 09:29:05'),
(67, 5, 17, 66, '2021-06-19 09:29:09'),
(68, 5, 14, 53, '2021-06-19 09:29:17'),
(69, 6, 18, 70, '2021-06-19 09:33:55'),
(70, 6, 19, 71, '2021-06-19 09:33:57'),
(71, 6, 16, 61, '2021-06-19 09:36:18'),
(72, 6, 17, 65, '2021-06-19 09:36:25'),
(73, 6, 11, 40, '2021-06-19 09:36:30'),
(74, 6, 21, 77, '2021-06-19 09:36:36'),
(75, 6, 20, 72, '2021-06-19 09:36:43'),
(76, 6, 8, 23, '2021-06-19 09:36:48'),
(77, 6, 9, 35, '2021-06-19 09:36:57'),
(78, 6, 14, 50, '2021-06-19 09:37:06'),
(79, 6, 13, 47, '2021-06-19 09:37:34'),
(80, 6, 22, 84, '2021-06-19 09:42:07'),
(81, 1, 15, 54, '2021-06-19 09:48:46'),
(82, 1, 17, 64, '2021-06-19 09:48:49'),
(83, 1, 18, 70, '2021-06-19 09:48:53'),
(84, 1, 16, 59, '2021-06-19 09:48:58'),
(85, 1, 14, 52, '2021-06-19 09:49:05'),
(86, 1, 21, 77, '2021-06-19 09:49:10'),
(87, 1, 20, 74, '2021-06-19 09:49:19'),
(88, 1, 19, 71, '2021-06-19 09:49:26'),
(89, 1, 22, 81, '2021-06-19 09:49:31');

--
-- Triggers `user_answers`
--
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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `comments_ibfk_1` (`survey_id`),
  ADD KEY `comments_ibfk_2` (`user_id`);

--
-- Indexes for table `surveys`
--
ALTER TABLE `surveys`
  ADD PRIMARY KEY (`survey_id`),
  ADD KEY `surveys_ibfk_1` (`author_id`);

--
-- Indexes for table `survey_options`
--
ALTER TABLE `survey_options`
  ADD PRIMARY KEY (`option_id`),
  ADD KEY `survey_options_ibfk_1` (`survey_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `user_token` (`user_token`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_answers`
--
ALTER TABLE `user_answers`
  ADD PRIMARY KEY (`answer_id`),
  ADD UNIQUE KEY `unique_user_answers` (`user_id`,`survey_id`),
  ADD KEY `user_answers_ibfk_1` (`user_id`),
  ADD KEY `user_answers_ibfk_2` (`survey_id`),
  ADD KEY `user_answers_ibfk_3` (`option_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `surveys`
--
ALTER TABLE `surveys`
  MODIFY `survey_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `survey_options`
--
ALTER TABLE `survey_options`
  MODIFY `option_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user_answers`
--
ALTER TABLE `user_answers`
  MODIFY `answer_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`survey_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `surveys`
--
ALTER TABLE `surveys`
  ADD CONSTRAINT `surveys_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `survey_options`
--
ALTER TABLE `survey_options`
  ADD CONSTRAINT `survey_options_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`survey_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_answers`
--
ALTER TABLE `user_answers`
  ADD CONSTRAINT `user_answers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_answers_ibfk_2` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`survey_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_answers_ibfk_3` FOREIGN KEY (`option_id`) REFERENCES `survey_options` (`option_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
