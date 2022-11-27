-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 27, 2022 at 11:38 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rotmgtb`
--

-- --------------------------------------------------------

--
-- Table structure for table `tradeoffers`
--

CREATE TABLE `tradeoffers` (
  `ID` int(11) NOT NULL,
  `DCID` varchar(100) NOT NULL,
  `DCNAME` varchar(60) NOT NULL,
  `IGN` varchar(60) NOT NULL,
  `CATEGORY` varchar(100) NOT NULL,
  `ITEM1` varchar(100) NOT NULL,
  `Q1` int(100) NOT NULL,
  `ITEM2` varchar(100) NOT NULL,
  `Q2` int(100) NOT NULL,
  `MESSAGEID` varchar(100) DEFAULT NULL,
  `CHANNELID` varchar(100) DEFAULT NULL,
  `CTS` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tradeoffers`
--
ALTER TABLE `tradeoffers`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tradeoffers`
--
ALTER TABLE `tradeoffers`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
