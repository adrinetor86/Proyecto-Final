-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-04-2024 a las 03:06:37
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `id_comment` int(11) NOT NULL,
  `user` varchar(15) NOT NULL,
  `game` varchar(200) NOT NULL,
  `content_comment` varchar(200) NOT NULL,
  `parent_comment` int(11) DEFAULT NULL,
  `comment_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`id_comment`, `user`, `game`, `content_comment`, `parent_comment`, `comment_date`) VALUES
(2, 'Darling1204', 'ARK: Survival Evolved', 'Maldito sea el jacket que siempre me hace perder el 50/50', NULL, '2024-04-20 02:56:46'),
(3, 'random1234', 'Genshin Impact', 'Pues tienes razon mi pana, siempre la gafa', 2, '2024-04-20 02:58:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `games`
--

CREATE TABLE `games` (
  `title` varchar(200) NOT NULL,
  `synopsis` varchar(500) DEFAULT NULL,
  `developer` varchar(50) DEFAULT NULL,
  `link_download` varchar(200) DEFAULT NULL,
  `link_trailer` varchar(200) DEFAULT NULL,
  `release_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `games`
--

INSERT INTO `games` (`title`, `synopsis`, `developer`, `link_download`, `link_trailer`, `release_date`) VALUES
('ARK: Survival Evolved', 'Despiertas en la orilla de una isla misteriosa en la que debes aprender a sobrevivir. Usa tu astucia para matar o domar a las criaturas primitivas que vagan por el lugar. Encuéntrate con otros jugadores para sobrevivir, ejercer el dominio... ¡y escapar!', 'Studio Wildcard', 'https://store.steampowered.com/app/346110/ARK_Survival_Evolved/?l=spanish', 'https://www.youtube.com/watch?v=FW9vsrPWujI&ab_channel=ARK%3ASurvivalAscended', '2015-06-02'),
('Genshin Impact', 'Bienvenidos a Teyvat, un continente fantástico donde incontables criaturas prosperan en armonía. Regido por siete Arcontes, este mundo es un lugar donde los siete elementos convergen... Dos gemelos llegan de otro mundo. Una deidad aparece delante de ustedes, les separa y te hace caer en un profundo sueño. Cuando despiertas, el mundo ya no es el mismo que conocías... Así comienza tu travesía en Teyvat para buscar respuestas de Los Siete, los dioses elementales.', 'miHoYo', 'https://genshin.hoyoverse.com/es/home', 'https://www.youtube.com/watch?v=TAlKhARUcoY&ab_channel=GenshinImpact', '2020-09-28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `games_genders`
--

CREATE TABLE `games_genders` (
  `id_gender` int(11) NOT NULL,
  `game` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `games_genders`
--

INSERT INTO `games_genders` (`id_gender`, `game`) VALUES
(1, 'Genshin Impact'),
(2, 'Genshin Impact'),
(3, 'Genshin Impact'),
(4, 'ARK: Survival Evolved'),
(5, 'ARK: Survival Evolved');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `games_maps`
--

CREATE TABLE `games_maps` (
  `url_map` int(11) NOT NULL,
  `game` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `games_plataforms`
--

CREATE TABLE `games_plataforms` (
  `id_plataform` int(11) NOT NULL,
  `game` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `games_plataforms`
--

INSERT INTO `games_plataforms` (`id_plataform`, `game`) VALUES
(1, 'ARK: Survival Evolved'),
(1, 'Genshin Impact'),
(2, 'ARK: Survival Evolved'),
(2, 'Genshin Impact'),
(3, 'ARK: Survival Evolved'),
(3, 'Genshin Impact');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_actions`
--

CREATE TABLE `log_actions` (
  `id_log_action` int(11) NOT NULL,
  `user` varchar(15) DEFAULT NULL,
  `game` varchar(100) NOT NULL,
  `date_creation` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `log_actions`
--

INSERT INTO `log_actions` (`id_log_action`, `user`, `game`, `date_creation`) VALUES
(1, 'Darling1204', 'Genshin Impact', '2024-04-20 03:04:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rols`
--

CREATE TABLE `rols` (
  `id_rol` int(11) NOT NULL,
  `type_rol` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

CREATE TABLE `type_actions` (
  `id_type_actions` int(11) NOT NULL,
  `type_action` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

CREATE TABLE `type_genders` (
  `id_type_gender` int(2) NOT NULL,
  `name_gender` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `type_genders`
--

INSERT INTO `type_genders` (`id_type_gender`, `name_gender`) VALUES
(1, 'Fantástico'),
(2, 'RPG'),
(3, 'Animación'),
(4, 'Supervivencia'),
(5, 'Aventura');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `type_plataform`
--

CREATE TABLE `type_plataform` (
  `id_type_plataform` int(2) NOT NULL,
  `name_plataform` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `type_plataform`
--

INSERT INTO `type_plataform` (`id_type_plataform`, `name_plataform`) VALUES
(1, 'Play Station'),
(2, 'XBOX'),
(3, 'PC');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `email` varchar(100) NOT NULL,
  `username` varchar(15) DEFAULT NULL,
  `password` varchar(20) NOT NULL,
  `date_creation` date DEFAULT NULL,
  `rol_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`email`, `username`, `password`, `date_creation`, `rol_user`) VALUES
('Nahuelhidalgo1204@gmail.com', 'Darling1204', 'Nahuel123456', '2024-04-20', 1),
('usuariorandom@gmail.com', 'random1234', 'random1234', '2024-04-20', 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id_comment`),
  ADD KEY `user` (`user`),
  ADD KEY `game` (`game`),
  ADD KEY `fk_comment` (`parent_comment`);

--
-- Indices de la tabla `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`title`);

--
-- Indices de la tabla `games_genders`
--
ALTER TABLE `games_genders`
  ADD PRIMARY KEY (`id_gender`,`game`),
  ADD KEY `game` (`game`);

--
-- Indices de la tabla `games_maps`
--
ALTER TABLE `games_maps`
  ADD PRIMARY KEY (`url_map`),
  ADD KEY `game` (`game`);

--
-- Indices de la tabla `games_plataforms`
--
ALTER TABLE `games_plataforms`
  ADD PRIMARY KEY (`id_plataform`,`game`),
  ADD KEY `game` (`game`);

--
-- Indices de la tabla `log_actions`
--
ALTER TABLE `log_actions`
  ADD PRIMARY KEY (`id_log_action`),
  ADD UNIQUE KEY `user` (`user`);

--
-- Indices de la tabla `rols`
--
ALTER TABLE `rols`
  ADD PRIMARY KEY (`id_rol`),
  ADD UNIQUE KEY `type_rol` (`type_rol`);

--
-- Indices de la tabla `type_actions`
--
ALTER TABLE `type_actions`
  ADD PRIMARY KEY (`id_type_actions`),
  ADD UNIQUE KEY `type_action` (`type_action`);

--
-- Indices de la tabla `type_genders`
--
ALTER TABLE `type_genders`
  ADD PRIMARY KEY (`id_type_gender`);

--
-- Indices de la tabla `type_plataform`
--
ALTER TABLE `type_plataform`
  ADD PRIMARY KEY (`id_type_plataform`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `rol_user` (`rol_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `id_comment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `rols`
--
ALTER TABLE `rols`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `type_actions`
--
ALTER TABLE `type_actions`
  MODIFY `id_type_actions` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `type_genders`
--
ALTER TABLE `type_genders`
  MODIFY `id_type_gender` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `type_plataform`
--
ALTER TABLE `type_plataform`
  MODIFY `id_type_plataform` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`username`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`game`) REFERENCES `games` (`title`),
  ADD CONSTRAINT `fk_comment` FOREIGN KEY (`parent_comment`) REFERENCES `comments` (`id_comment`);

--
-- Filtros para la tabla `games_genders`
--
ALTER TABLE `games_genders`
  ADD CONSTRAINT `games_genders_ibfk_1` FOREIGN KEY (`id_gender`) REFERENCES `type_genders` (`id_type_gender`),
  ADD CONSTRAINT `games_genders_ibfk_2` FOREIGN KEY (`game`) REFERENCES `games` (`title`);

--
-- Filtros para la tabla `games_maps`
--
ALTER TABLE `games_maps`
  ADD CONSTRAINT `games_maps_ibfk_1` FOREIGN KEY (`game`) REFERENCES `games` (`title`);

--
-- Filtros para la tabla `games_plataforms`
--
ALTER TABLE `games_plataforms`
  ADD CONSTRAINT `games_plataforms_ibfk_1` FOREIGN KEY (`id_plataform`) REFERENCES `type_plataform` (`id_type_plataform`),
  ADD CONSTRAINT `games_plataforms_ibfk_2` FOREIGN KEY (`game`) REFERENCES `games` (`title`);

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
