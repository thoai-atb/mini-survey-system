-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 26, 2021 at 05:27 AM
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

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `user` int(11) NOT NULL,
  `survey` int(11) NOT NULL,
  `survey_option` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `text` text NOT NULL,
  `survey` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `surveys`
--

CREATE TABLE `surveys` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `author` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `survey_options`
--

CREATE TABLE `survey_options` (
  `id` int(11) NOT NULL,
  `text` text NOT NULL,
  `count` int(11) NOT NULL DEFAULT 0,
  `survey` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`user`,`survey`),
  ADD KEY `answer-survey` (`survey`),
  ADD KEY `answer-survey-option` (`survey_option`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comment-from-survey` (`survey`),
  ADD KEY `comment-from-user` (`user`);

--
-- Indexes for table `surveys`
--
ALTER TABLE `surveys`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user-create-survey` (`author`);

--
-- Indexes for table `survey_options`
--
ALTER TABLE `survey_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `survey-contains-option` (`survey`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `surveys`
--
ALTER TABLE `surveys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `survey_options`
--
ALTER TABLE `survey_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answer-survey` FOREIGN KEY (`survey`) REFERENCES `surveys` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `answer-survey-option` FOREIGN KEY (`survey_option`) REFERENCES `survey_options` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `answer-user` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comment-from-survey` FOREIGN KEY (`survey`) REFERENCES `surveys` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment-from-user` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `surveys`
--
ALTER TABLE `surveys`
  ADD CONSTRAINT `user-create-survey` FOREIGN KEY (`author`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `survey_options`
--
ALTER TABLE `survey_options`
  ADD CONSTRAINT `survey-contains-option` FOREIGN KEY (`survey`) REFERENCES `surveys` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
