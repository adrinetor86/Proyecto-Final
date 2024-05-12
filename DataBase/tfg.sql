-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-05-2024 a las 07:07:33
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

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id_comment` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(15) DEFAULT NULL,
  `id_game` int(11) DEFAULT NULL,
  `content_comment` text NOT NULL,
  `parent_comment` int(11) DEFAULT NULL,
  `comment_date` datetime NOT NULL,
  PRIMARY KEY (`id_comment`),
  KEY `user` (`user`),
  KEY `id_game` (`id_game`),
  KEY `fk_comment` (`parent_comment`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `comments`
--

TRUNCATE TABLE `comments`;
--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`id_comment`, `user`, `id_game`, `content_comment`, `parent_comment`, `comment_date`) VALUES
(3, 'Darling1204', 1, 'El juego es muy divertido, sobretodo Fontaine.', NULL, '2024-04-28 19:15:45'),
(4, 'random1234', 1, 'Tienes razon, la musica, el lore, y sobretodo Furina son lo mejor.', 3, '2024-04-28 19:16:23'),
(5, 'random1234', 1, 'El juego es muy bueno. Pena que siempre pierda todos los 50/50', NULL, '2024-04-28 19:17:33'),
(6, 'Darling1204', 1, 'Estoy de acuerdo, mi Furina C2 algun dia sera C6', 4, '2024-04-28 19:19:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `games`
--

DROP TABLE IF EXISTS `games`;
CREATE TABLE IF NOT EXISTS `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `synopsis` text DEFAULT NULL,
  `developer` varchar(50) NOT NULL,
  `link_download` varchar(200) NOT NULL,
  `link_trailer` varchar(200) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `front_page` longtext DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `games`
--

TRUNCATE TABLE `games`;
--
-- Volcado de datos para la tabla `games`
--

INSERT INTO `games` (`id`, `title`, `synopsis`, `developer`, `link_download`, `link_trailer`, `release_date`, `front_page`) VALUES
(1, 'Genshin Impact', 'Genshin Impact tiene lugar en el mundo de fantasÃ­a de Teyvat, hogar de siete naciones, cada una de las cuales estÃ¡ ligada a un elemento diferente y gobernada por un dios (arconte) diferente. La historia sigue a The Traveller, un aventurero interestelar que, al comienzo del juego, se separa de su hermano gemelo despuÃ©s de que los dos aterrizan en Teyvat. A partir de entonces, el Viajero viaja a travÃ©s de las naciones de Teyvat en busca del hermano perdido, acompaÃ±ado por su guÃ­a, Paimon . En el camino, los dos se hacen amigos de innumerables personas, se involucran en los asuntos de sus naciones y comienzan a desentraÃ±ar los misterios de la tierra.', 'miHoYo', 'https://genshin.hoyoverse.com/es/company/about', 'https://www.youtube.com/watch?v=TAlKhARUcoY&ab_channel=GenshinImpact', '2020-09-28', NULL),
(2, 'The Forest', 'The Forest es un videojuego de terror y supervivencia desarrollado y publicado por Endnight Games. El juego se desarrolla en una remota penÃ­nsula densamente boscosa, donde el personaje del jugador Eric LeBlanc debe luchar contra monstruos canÃ­bales, mientras busca a su hijo Timmy despuÃ©s de un accidente aÃ©reo.', 'Endnight Games Ltd', 'https://store.steampowered.com/agecheck/app/242760/?l=spanish', 'https://www.youtube.com/watch?v=7mwn5U2PNvk&ab_channel=GameSpot', '2014-05-30', NULL),
(3, 'Subnautica', 'Desciende a las profundidades de un mundo submarino alienÃ­gena lleno de belleza y peligros. Crea equipamiento, pilota submarinos, terraforma el terreno, y burla los peligros para explorar exhuberantes arrecifes de coral, volcanes, sistemas de cuevas y mÃ¡s - Todo mientras intentas sobrevivir.', 'Unknown Worlds Entertainment', 'https://store.steampowered.com/app/264710/Subnautica/?l=spanish', 'https://www.youtube.com/watch?v=_7BzngvURrk&ab_channel=Subnautica', '2018-01-23', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `games_genders`
--

DROP TABLE IF EXISTS `games_genders`;
CREATE TABLE IF NOT EXISTS `games_genders` (
  `id_gender` int(11) NOT NULL,
  `id_game` int(11) NOT NULL,
  PRIMARY KEY (`id_gender`,`id_game`),
  KEY `id_game` (`id_game`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `games_genders`
--

TRUNCATE TABLE `games_genders`;
--
-- Volcado de datos para la tabla `games_genders`
--

INSERT INTO `games_genders` (`id_gender`, `id_game`) VALUES
(2, 1),
(3, 1),
(5, 1),
(15, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `games_maps`
--

DROP TABLE IF EXISTS `games_maps`;
CREATE TABLE IF NOT EXISTS `games_maps` (
  `id_map` int(11) NOT NULL AUTO_INCREMENT,
  `id_game` int(11) DEFAULT NULL,
  `url_map` longtext NOT NULL,
  PRIMARY KEY (`id_map`),
  KEY `id_game` (`id_game`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `games_maps`
--

TRUNCATE TABLE `games_maps`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `games_plataforms`
--

DROP TABLE IF EXISTS `games_plataforms`;
CREATE TABLE IF NOT EXISTS `games_plataforms` (
  `id_plataform` int(11) NOT NULL,
  `id_game` int(200) NOT NULL,
  PRIMARY KEY (`id_plataform`,`id_game`),
  KEY `id_game` (`id_game`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `games_plataforms`
--

TRUNCATE TABLE `games_plataforms`;
--
-- Volcado de datos para la tabla `games_plataforms`
--

INSERT INTO `games_plataforms` (`id_plataform`, `id_game`) VALUES
(1, 1),
(2, 1),
(3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_actions`
--

DROP TABLE IF EXISTS `log_actions`;
CREATE TABLE IF NOT EXISTS `log_actions` (
  `id_log_action` int(11) NOT NULL,
  `user` varchar(15) DEFAULT NULL,
  `game` varchar(100) NOT NULL,
  `date_creation` datetime DEFAULT NULL,
  PRIMARY KEY (`id_log_action`),
  UNIQUE KEY `user` (`user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `log_actions`
--

TRUNCATE TABLE `log_actions`;
--
-- Volcado de datos para la tabla `log_actions`
--

INSERT INTO `log_actions` (`id_log_action`, `user`, `game`, `date_creation`) VALUES
(1, 'Darling1204', 'Genshin Impact', '2024-04-20 03:04:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rols`
--

DROP TABLE IF EXISTS `rols`;
CREATE TABLE IF NOT EXISTS `rols` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `type_rol` varchar(15) NOT NULL,
  PRIMARY KEY (`id_rol`),
  UNIQUE KEY `type_rol` (`type_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `rols`
--

TRUNCATE TABLE `rols`;
--
-- Volcado de datos para la tabla `rols`
--

INSERT INTO `rols` (`id_rol`, `type_rol`) VALUES
(1, 'Administrador'),
(2, 'Editor'),
(3, 'Usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `type_actions`
--

DROP TABLE IF EXISTS `type_actions`;
CREATE TABLE IF NOT EXISTS `type_actions` (
  `id_type_actions` int(11) NOT NULL AUTO_INCREMENT,
  `type_action` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_type_actions`),
  UNIQUE KEY `type_action` (`type_action`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `type_actions`
--

TRUNCATE TABLE `type_actions`;
--
-- Volcado de datos para la tabla `type_actions`
--

INSERT INTO `type_actions` (`id_type_actions`, `type_action`) VALUES
(3, 'Editar'),
(2, 'Eliminar'),
(1, 'Insertar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `type_genders`
--

DROP TABLE IF EXISTS `type_genders`;
CREATE TABLE IF NOT EXISTS `type_genders` (
  `id_type_gender` int(2) NOT NULL AUTO_INCREMENT,
  `name_gender` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_type_gender`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `type_genders`
--

TRUNCATE TABLE `type_genders`;
--
-- Volcado de datos para la tabla `type_genders`
--

INSERT INTO `type_genders` (`id_type_gender`, `name_gender`) VALUES
(1, 'Fantastico'),
(2, 'RPG'),
(3, 'Animacion'),
(4, 'Supervivencia'),
(5, 'Aventura'),
(6, 'Accion'),
(7, 'Arcade'),
(8, 'Deportes'),
(9, 'Estrategia'),
(10, 'Simulacion'),
(11, 'Juegos de mesa'),
(12, 'Shooter'),
(13, 'Terror'),
(14, 'Rol'),
(15, 'Puzzle');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `type_plataform`
--

DROP TABLE IF EXISTS `type_plataform`;
CREATE TABLE IF NOT EXISTS `type_plataform` (
  `id_type_plataform` int(2) NOT NULL AUTO_INCREMENT,
  `name_plataform` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_type_plataform`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `type_plataform`
--

TRUNCATE TABLE `type_plataform`;
--
-- Volcado de datos para la tabla `type_plataform`
--

INSERT INTO `type_plataform` (`id_type_plataform`, `name_plataform`) VALUES
(1, 'Play Station'),
(2, 'XBOX'),
(3, 'PC'),
(4, 'Nintendo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `email` varchar(100) NOT NULL,
  `username` varchar(15) DEFAULT NULL,
  `password` text NOT NULL,
  `date_creation` date DEFAULT NULL,
  `rol_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`email`),
  UNIQUE KEY `username` (`username`),
  KEY `rol_user` (`rol_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `users`
--

TRUNCATE TABLE `users`;
--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`email`, `username`, `password`, `date_creation`, `rol_user`) VALUES
('JacketKawaii@gmail.com', 'Jack_uwu', 'Jacket1234', '2024-05-12', 2),
('Nahuelhidalgo1204@gmail.com', 'Darling1204', 'Nahuel123456', '2024-04-20', 1),
('usuariorandom@gmail.com', 'random1234', 'random1234', '2024-04-20', 3);

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
