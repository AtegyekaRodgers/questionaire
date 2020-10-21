-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 21, 2020 at 09:51 AM
-- Server version: 10.1.33-MariaDB
-- PHP Version: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `research_questionaire_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `organisations`
--

CREATE TABLE `organisations` (
  `orgID` varchar(12) NOT NULL,
  `orgname` varchar(300) NOT NULL,
  `orgType` varchar(12) NOT NULL,
  `about` varchar(300) DEFAULT '',
  `email` varchar(60) DEFAULT '',
  `phone` varchar(20) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `organisations`
--

INSERT INTO `organisations` (`orgID`, `orgname`, `orgType`, `about`, `email`, `phone`) VALUES
('DN001', 'UNHCR', 'donor', 'The UN Refugee agancy', 'testorg001@yahoo.com', ''),
('DN002', 'UNDP', 'donor', 'For the development of the world economy', 'testorg002@gmail.com', ''),
('NG001', 'AIRD', 'ngo', 'For relief and development', 'testorg003@yahoo.com', ''),
('NG002', 'Window Trust', 'ngo', 'For education support', 'testorg004@hotmail.com', '');

-- --------------------------------------------------------

--
-- Table structure for table `respondents`
--

CREATE TABLE `respondents` (
  `orgID` varchar(12) NOT NULL,
  `email` varchar(60) DEFAULT '',
  `phone` varchar(20) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `respondents`
--

INSERT INTO `respondents` (`orgID`, `email`, `phone`) VALUES
('DN001', 'testperson003@yahoo.com', '+256706123303'),
('NG002', 'testperson004@gmail.com', '+256781224508'),
('DN001', 'testperson001@gmail.com', '+2567061233009'),
('NG002', 'testperson002@hotmail.com', ''),
('DN002', 'testperson005@gmail.com', '+2567061233030'),
('NG001', 'testperson006@hotmail.com', ''),
('DN002', 'testperson007@gmail.com', ''),
('NG001', 'testperson008@yahoo.com', '');

-- --------------------------------------------------------

--
-- Table structure for table `responses`
--

CREATE TABLE `responses` (
  `count` int(11) NOT NULL,
  `orgID` varchar(12) NOT NULL,
  `OrgResponseData` longtext
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `responses`
--

INSERT INTO `responses` (`count`, `orgID`, `OrgResponseData`) VALUES
(1, '', '{\"orgname\":\"\",\"ttype\":\"donor\",\"about\":\"\",\"respondents\":[{\"name\":\"Ategyeka Rodgers\",\"gender\":\"Male\",\"title\":\"General manager\",\"email\":\"testperson003@yahoo.com\"},{\"name\":\"\",\"gender\":\"\",\"title\":\"\",\"email\":\"testperson003@yahoo.com\"},{\"name\":\"\",\"gender\":\"\",\"title\":\"\",\"email\":\"testperson003@yahoo.com\"},{\"name\":\"\",\"gender\":\"\",\"title\":\"\",\"email\":\"testperson003@yahoo.com\"},{\"name\":\"\",\"gender\":\"\",\"title\":\"\",\"email\":\"testperson003@yahoo.com\"},{\"name\":\"Pires Robert\",\"gender\":\"Male\",\"title\":\"Footballer\",\"email\":\"testperson004@yahoo.com\"},{\"name\":\"Kabagambe Kened\",\"gender\":\"Male\",\"title\":\"Plumber\",\"email\":\"testperson005@gmail.com\"},{\"name\":\"Kelen Jesca\",\"gender\":\"Female\",\"title\":\"Human resource manager\",\"email\":\"testperson008@yahoo.com\"},{\"name\":\"Mawanda Charles\",\"gender\":\"Male\",\"title\":\"Driver\",\"email\":\"testperson008@yahoo.com\"},{\"name\":\"\",\"gender\":\"\",\"title\":\"\",\"email\":\"testperson008@yahoo.com\"},{\"name\":\"Kato samuel\",\"gender\":\"Male\",\"title\":\"Manager\",\"email\":\"testperson008@yahoo.com\"},{\"name\":\"\",\"gender\":\"\",\"title\":\"\",\"email\":\"testperson004@yahoo.com\"},{\"name\":\"Jimy Piriyo\",\"gender\":\"Male\",\"title\":\"Data analyst\",\"email\":\"testing00021@yahoo.com\"}],\"responses\":[{\"questionId\":\"qn1\",\"answers\":[]},{\"questionId\":\"qn1_a\",\"answers\":[\"Ategyeka Rodgers\"]},{\"questionId\":\"qn1_b\",\"answers\":[\"Male\"]},{\"questionId\":\"qn1_c\",\"answers\":[\"General manager\"]},{\"questionId\":\"qn2\",\"answers\":[]},{\"questionId\":\"qn2_a\",\"answers\":[\"\"]},{\"questionId\":\"qn2_b\",\"answers\":[\"\"]},{\"questionId\":\"qn2_c\",\"answers\":[\"\"]},{\"questionId\":\"qn3\",\"answers\":[\"\"]},{\"questionId\":\"qn4\",\"answers\":[\"\"]},{\"questionId\":\"qn5\",\"answers\":[\"\",\"\"]},{\"questionId\":\"qn6\",\"answers\":[\"\",\"\",\"\",\"\",\"\"]},{\"questionId\":\"qn7\",\"answers\":[\"\"]},{\"questionId\":\"qn8\",\"answers\":[\"\"]},{\"questionId\":\"qn9\",\"answers\":[\"\"]},{\"questionId\":\"qn10\",\"answers\":[\"\"]},{\"questionId\":\"qn11\",\"answers\":[]},{\"questionId\":\"qn12\",\"answers\":[]},{\"questionId\":\"qn13\",\"answers\":[]},{\"questionId\":\"qn14\",\"answers\":[]},{\"questionId\":\"qn15\",\"answers\":[]},{\"questionId\":\"qn16\",\"answers\":[]},{\"questionId\":\"qn17\",\"answers\":[\"\",\"\",\"\"]}]}'),
(2, 'NG001', '{\"orgname\":\"AIRD\",\"ttype\":\"donor\",\"about\":\"For relief and development\",\"respondents\":[{\"name\":\"\",\"gender\":\"\",\"title\":\"\",\"email\":\"testperson008@yahoo.com\"},{\"name\":\"\",\"gender\":\"\",\"title\":\"\",\"email\":\"testperson008@yahoo.com\"},{\"name\":\"\",\"gender\":\"\",\"title\":\"\",\"email\":\"testperson008@yahoo.com\"},{\"name\":\"\",\"gender\":\"\",\"title\":\"\",\"email\":\"testperson008@yahoo.com\"},{\"name\":\"\",\"gender\":\"\",\"title\":\"\",\"email\":\"testperson008@yahoo.com\"}],\"responses\":[{\"questionId\":\"qn1\",\"answers\":[]},{\"questionId\":\"qn1_a\",\"answers\":[\"\"]},{\"questionId\":\"qn1_b\",\"answers\":[\"\"]},{\"questionId\":\"qn1_c\",\"answers\":[\"\"]},{\"questionId\":\"qn2\",\"answers\":[]},{\"questionId\":\"qn2_a\",\"answers\":[\"\"]},{\"questionId\":\"qn2_b\",\"answers\":[\"\"]},{\"questionId\":\"qn2_c\",\"answers\":[\"\"]},{\"questionId\":\"qn3\",\"answers\":[\"\"]},{\"questionId\":\"qn4\",\"answers\":[\"\"]},{\"questionId\":\"qn5\",\"answers\":[\"\",\"\"]},{\"questionId\":\"qn6\",\"answers\":[\"\",\"\",\"\",\"\",\"\"]},{\"questionId\":\"qn7\",\"answers\":[\"\"]},{\"questionId\":\"qn8\",\"answers\":[\"\"]},{\"questionId\":\"qn9\",\"answers\":[\"\"]},{\"questionId\":\"qn10\",\"answers\":[\"\"]},{\"questionId\":\"qn11\",\"answers\":[]},{\"questionId\":\"qn12\",\"answers\":[]},{\"questionId\":\"qn13\",\"answers\":[]},{\"questionId\":\"qn14\",\"answers\":[]},{\"questionId\":\"qn15\",\"answers\":[]},{\"questionId\":\"qn16\",\"answers\":[]},{\"questionId\":\"qn17\",\"answers\":[\"\",\"\",\"\"]}]}');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `responses`
--
ALTER TABLE `responses`
  ADD UNIQUE KEY `count` (`count`),
  ADD UNIQUE KEY `orgID` (`orgID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `responses`
--
ALTER TABLE `responses`
  MODIFY `count` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
