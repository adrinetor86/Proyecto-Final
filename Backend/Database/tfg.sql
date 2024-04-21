-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-04-2024 a las 00:05:36
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tfg`
--
CREATE DATABASE IF NOT EXISTS `tfg` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `tfg`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `id_comment` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(15) DEFAULT NULL,
  `id_game` int(11) DEFAULT NULL,
  `content_comment` varchar(200) NOT NULL,
  `parent_comment` int(11) DEFAULT NULL,
  `comment_date` datetime NOT NULL,
  PRIMARY KEY (`id_comment`),
  KEY `user` (`user`),
  KEY `id_game` (`id_game`),
  KEY `fk_comment` (`parent_comment`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `comments`:
--   `user`
--       `users` -> `username`
--   `id_game`
--       `games` -> `id`
--   `parent_comment`
--       `comments` -> `id_comment`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `games`
--

CREATE TABLE IF NOT EXISTS `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `synopsis` varchar(500) DEFAULT NULL,
  `developer` varchar(50) NOT NULL,
  `link_download` varchar(200) NOT NULL,
  `link_trailer` varchar(200) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `games`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `games_genders`
--

CREATE TABLE IF NOT EXISTS `games_genders` (
  `id_gender` int(11) NOT NULL,
  `id_game` int(11) NOT NULL,
  PRIMARY KEY (`id_gender`,`id_game`),
  KEY `id_game` (`id_game`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `games_genders`:
--   `id_gender`
--       `type_genders` -> `id_type_gender`
--   `id_game`
--       `games` -> `id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `games_maps`
--

CREATE TABLE IF NOT EXISTS `games_maps` (
  `url_map` varchar(200) NOT NULL,
  `id_game` int(11) NOT NULL,
  PRIMARY KEY (`url_map`,`id_game`),
  KEY `id_game` (`id_game`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `games_maps`:
--   `id_game`
--       `games` -> `id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `games_plataforms`
--

CREATE TABLE IF NOT EXISTS `games_plataforms` (
  `id_plataform` int(11) NOT NULL,
  `id_game` int(200) NOT NULL,
  PRIMARY KEY (`id_plataform`,`id_game`),
  KEY `id_game` (`id_game`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `games_plataforms`:
--   `id_plataform`
--       `type_plataform` -> `id_type_plataform`
--   `id_game`
--       `games` -> `id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_actions`
--

CREATE TABLE IF NOT EXISTS `log_actions` (
  `id_log_action` int(11) NOT NULL,
  `user` varchar(15) DEFAULT NULL,
  `game` varchar(100) NOT NULL,
  `date_creation` datetime DEFAULT NULL,
  PRIMARY KEY (`id_log_action`),
  UNIQUE KEY `user` (`user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `log_actions`:
--   `id_log_action`
--       `type_actions` -> `id_type_actions`
--   `user`
--       `users` -> `username`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rols`
--

CREATE TABLE IF NOT EXISTS `rols` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `type_rol` varchar(15) NOT NULL,
  PRIMARY KEY (`id_rol`),
  UNIQUE KEY `type_rol` (`type_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `rols`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `type_actions`
--

CREATE TABLE IF NOT EXISTS `type_actions` (
  `id_type_actions` int(11) NOT NULL AUTO_INCREMENT,
  `type_action` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_type_actions`),
  UNIQUE KEY `type_action` (`type_action`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `type_actions`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `type_genders`
--

CREATE TABLE IF NOT EXISTS `type_genders` (
  `id_type_gender` int(2) NOT NULL AUTO_INCREMENT,
  `name_gender` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_type_gender`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `type_genders`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `type_plataform`
--

CREATE TABLE IF NOT EXISTS `type_plataform` (
  `id_type_plataform` int(2) NOT NULL AUTO_INCREMENT,
  `name_plataform` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_type_plataform`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `type_plataform`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `email` varchar(100) NOT NULL,
  `username` varchar(15) DEFAULT NULL,
  `password` varchar(20) NOT NULL,
  `date_creation` date DEFAULT NULL,
  `rol_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`email`),
  UNIQUE KEY `username` (`username`),
  KEY `rol_user` (`rol_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `users`:
--   `rol_user`
--       `rols` -> `id_rol`
--

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`username`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`id_game`) REFERENCES `games` (`id`),
  ADD CONSTRAINT `fk_comment` FOREIGN KEY (`parent_comment`) REFERENCES `comments` (`id_comment`);

--
-- Filtros para la tabla `games_genders`
--
ALTER TABLE `games_genders`
  ADD CONSTRAINT `games_genders_ibfk_1` FOREIGN KEY (`id_gender`) REFERENCES `type_genders` (`id_type_gender`),
  ADD CONSTRAINT `games_genders_ibfk_2` FOREIGN KEY (`id_game`) REFERENCES `games` (`id`);

--
-- Filtros para la tabla `games_maps`
--
ALTER TABLE `games_maps`
  ADD CONSTRAINT `games_maps_ibfk_1` FOREIGN KEY (`id_game`) REFERENCES `games` (`id`);

--
-- Filtros para la tabla `games_plataforms`
--
ALTER TABLE `games_plataforms`
  ADD CONSTRAINT `games_plataforms_ibfk_1` FOREIGN KEY (`id_plataform`) REFERENCES `type_plataform` (`id_type_plataform`),
  ADD CONSTRAINT `games_plataforms_ibfk_2` FOREIGN KEY (`id_game`) REFERENCES `games` (`id`);

--
-- Filtros para la tabla `log_actions`
--
ALTER TABLE `log_actions`
  ADD CONSTRAINT `log_actions_ibfk_1` FOREIGN KEY (`id_log_action`) REFERENCES `type_actions` (`id_type_actions`),
  ADD CONSTRAINT `log_actions_ibfk_2` FOREIGN KEY (`user`) REFERENCES `users` (`username`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`rol_user`) REFERENCES `rols` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
