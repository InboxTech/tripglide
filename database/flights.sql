-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 06, 2025 at 07:07 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tripglide`
--

-- --------------------------------------------------------

--
-- Table structure for table `flights`
--

CREATE TABLE `flights` (
  `flight_id` int(11) NOT NULL,
  `flight_number` varchar(10) NOT NULL,
  `airline` varchar(100) NOT NULL,
  `departure_airport` varchar(100) NOT NULL,
  `arrival_airport` varchar(100) NOT NULL,
  `departure_time` datetime NOT NULL,
  `arrival_time` datetime NOT NULL,
  `duration` time NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `class` varchar(50) NOT NULL,
  `seat_availability` enum('Available','Limited','Not Available') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `flights`
--

INSERT INTO `flights` (`flight_id`, `flight_number`, `airline`, `departure_airport`, `arrival_airport`, `departure_time`, `arrival_time`, `duration`, `price`, `class`, `seat_availability`) VALUES
(1, 'AI101', 'Air India', 'New Delhi (DEL)', 'Mumbai (BOM)', '2025-03-10 06:00:00', '2025-03-10 08:30:00', '02:30:00', 150.00, 'Economy', 'Available'),
(2, 'AI102', 'Air India', 'Mumbai (BOM)', 'New Delhi (DEL)', '2025-03-10 09:00:00', '2025-03-10 11:30:00', '02:30:00', 150.00, 'Economy', 'Available'),
(3, '6E101', 'IndiGo', 'Bengaluru (BLR)', 'Chennai (MAA)', '2025-03-11 07:30:00', '2025-03-11 08:30:00', '01:00:00', 100.00, 'Economy', 'Limited'),
(4, '6E102', 'IndiGo', 'Chennai (MAA)', 'Bengaluru (BLR)', '2025-03-11 09:00:00', '2025-03-11 10:00:00', '01:00:00', 100.00, 'Economy', 'Available'),
(5, 'AI103', 'Air India', 'Kolkata (CCU)', 'New Delhi (DEL)', '2025-03-12 10:30:00', '2025-03-12 12:30:00', '02:00:00', 120.00, 'Business', 'Available'),
(6, 'AI104', 'Air India', 'New Delhi (DEL)', 'Kolkata (CCU)', '2025-03-12 14:00:00', '2025-03-12 16:00:00', '02:00:00', 120.00, 'Business', 'Available'),
(7, '6E103', 'IndiGo', 'Hyderabad (HYD)', 'Mumbai (BOM)', '2025-03-13 12:00:00', '2025-03-13 14:00:00', '02:00:00', 140.00, 'Economy', 'Available'),
(8, 'AI105', 'Air India', 'Mumbai (BOM)', 'Hyderabad (HYD)', '2025-03-13 15:00:00', '2025-03-13 17:00:00', '02:00:00', 140.00, 'Business', 'Limited'),
(9, '6E104', 'IndiGo', 'Delhi (DEL)', 'Jaipur (JAI)', '2025-03-14 06:00:00', '2025-03-14 07:00:00', '01:00:00', 80.00, 'Economy', 'Available'),
(10, '6E105', 'IndiGo', 'Jaipur (JAI)', 'Delhi (DEL)', '2025-03-14 08:00:00', '2025-03-14 09:00:00', '01:00:00', 80.00, 'Economy', 'Available'),
(11, 'AI106', 'Air India', 'Chennai (MAA)', 'Bengaluru (BLR)', '2025-03-15 11:00:00', '2025-03-15 12:00:00', '01:00:00', 90.00, 'Economy', 'Limited'),
(12, 'AI107', 'Air India', 'Bengaluru (BLR)', 'Chennai (MAA)', '2025-03-15 13:00:00', '2025-03-15 14:00:00', '01:00:00', 90.00, 'Economy', 'Available'),
(13, 'AI108', 'Air India', 'Mumbai (BOM)', 'Goa (GOI)', '2025-03-16 07:00:00', '2025-03-16 08:30:00', '01:30:00', 100.00, 'Economy', 'Available'),
(14, 'AI109', 'Air India', 'Goa (GOI)', 'Mumbai (BOM)', '2025-03-16 09:30:00', '2025-03-16 11:00:00', '01:30:00', 100.00, 'Economy', 'Limited'),
(15, '6E106', 'IndiGo', 'Bengaluru (BLR)', 'New Delhi (DEL)', '2025-03-17 10:00:00', '2025-03-17 12:00:00', '02:00:00', 150.00, 'Business', 'Available'),
(16, '6E107', 'IndiGo', 'New Delhi (DEL)', 'Bengaluru (BLR)', '2025-03-17 14:00:00', '2025-03-17 16:00:00', '02:00:00', 150.00, 'Business', 'Available'),
(17, 'AI110', 'Air India', 'Kochi (COK)', 'Chennai (MAA)', '2025-03-18 08:00:00', '2025-03-18 09:00:00', '01:00:00', 85.00, 'Economy', 'Available'),
(18, 'AI111', 'Air India', 'Chennai (MAA)', 'Kochi (COK)', '2025-03-18 10:30:00', '2025-03-18 11:30:00', '01:00:00', 85.00, 'Economy', 'Available'),
(19, 'AI112', 'Air India', 'Ahmedabad (AMD)', 'Mumbai (BOM)', '2025-03-19 16:00:00', '2025-03-19 17:00:00', '01:00:00', 110.00, 'Business', 'Limited'),
(20, '6E108', 'IndiGo', 'Hyderabad (HYD)', 'Pune (PNQ)', '2025-03-20 09:30:00', '2025-03-20 10:30:00', '01:00:00', 85.00, 'Economy', 'Available'),
(21, '6E109', 'IndiGo', 'Pune (PNQ)', 'Hyderabad (HYD)', '2025-03-20 12:00:00', '2025-03-20 13:00:00', '01:00:00', 85.00, 'Economy', 'Available'),
(22, 'AI113', 'Air India', 'Hyderabad (HYD)', 'New Delhi (DEL)', '2025-03-21 07:00:00', '2025-03-21 09:00:00', '02:00:00', 130.00, 'Business', 'Available'),
(23, 'AI114', 'Air India', 'New Delhi (DEL)', 'Hyderabad (HYD)', '2025-03-21 10:30:00', '2025-03-21 12:30:00', '02:00:00', 130.00, 'Business', 'Limited'),
(24, 'AI115', 'Air India', 'Bengaluru (BLR)', 'Goa (GOI)', '2025-03-22 17:30:00', '2025-03-22 19:00:00', '01:30:00', 120.00, 'Economy', 'Available'),
(25, '6E110', 'IndiGo', 'Chennai (MAA)', 'Ahmedabad (AMD)', '2025-03-23 10:00:00', '2025-03-23 12:00:00', '02:00:00', 140.00, 'Economy', 'Available'),
(26, 'AI116', 'Air India', 'Ahmedabad (AMD)', 'Chennai (MAA)', '2025-03-23 14:00:00', '2025-03-23 16:00:00', '02:00:00', 140.00, 'Economy', 'Available'),
(27, '6E111', 'IndiGo', 'Mumbai (BOM)', 'Pune (PNQ)', '2025-03-24 11:30:00', '2025-03-24 12:30:00', '01:00:00', 75.00, 'Economy', 'Available'),
(28, '6E112', 'IndiGo', 'Pune (PNQ)', 'Mumbai (BOM)', '2025-03-24 14:00:00', '2025-03-24 15:00:00', '01:00:00', 75.00, 'Economy', 'Available'),
(29, 'AI117', 'Air India', 'Goa (GOI)', 'Hyderabad (HYD)', '2025-03-25 06:30:00', '2025-03-25 08:00:00', '01:30:00', 120.00, 'Economy', 'Limited'),
(30, 'AI118', 'Air India', 'Hyderabad (HYD)', 'Goa (GOI)', '2025-03-25 09:30:00', '2025-03-25 11:00:00', '01:30:00', 120.00, 'Economy', 'Available'),
(31, '6E113', 'IndiGo', 'Delhi (DEL)', 'Chennai (MAA)', '2025-03-26 14:30:00', '2025-03-26 16:00:00', '01:30:00', 110.00, 'Business', 'Available'),
(32, '6E114', 'IndiGo', 'Chennai (MAA)', 'Delhi (DEL)', '2025-03-26 17:00:00', '2025-03-26 18:30:00', '01:30:00', 110.00, 'Business', 'Available'),
(33, 'AI119', 'Air India', 'Bengaluru (BLR)', 'Mumbai (BOM)', '2025-03-27 08:30:00', '2025-03-27 10:00:00', '01:30:00', 100.00, 'Economy', 'Limited'),
(34, 'AI120', 'Air India', 'Mumbai (BOM)', 'Bengaluru (BLR)', '2025-03-27 11:00:00', '2025-03-27 12:30:00', '01:30:00', 100.00, 'Economy', 'Available');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `flights`
--
ALTER TABLE `flights`
  ADD PRIMARY KEY (`flight_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `flights`
--
ALTER TABLE `flights`
  MODIFY `flight_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
