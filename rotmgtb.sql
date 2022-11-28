SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

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

ALTER TABLE `tradeoffers`
  ADD PRIMARY KEY (`ID`);
