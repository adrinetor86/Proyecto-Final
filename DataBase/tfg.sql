-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-05-2024 a las 18:40:30
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
-- Estructura de tabla para la tabla `codes_confirm`
--

DROP TABLE IF EXISTS `codes_confirm`;
CREATE TABLE `codes_confirm` (
  `email` varchar(100) NOT NULL,
  `code` int(5) DEFAULT NULL,
  `date_creation` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id_comment` int(11) NOT NULL,
  `user` varchar(15) DEFAULT NULL,
  `id_game` int(11) DEFAULT NULL,
  `content_comment` text NOT NULL,
  `parent_comment` int(11) DEFAULT NULL,
  `comment_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `synopsis` text DEFAULT NULL,
  `developer` varchar(50) NOT NULL,
  `link_download` varchar(200) NOT NULL,
  `link_trailer` varchar(200) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `front_page` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `games`
--

INSERT INTO `games` (`id`, `title`, `synopsis`, `developer`, `link_download`, `link_trailer`, `release_date`, `front_page`) VALUES
(1, 'Genshin Impact', 'Genshin Impact tiene lugar en el mundo de fantas├âãÆ├é┬¡a de Teyvat, hogar de siete naciones, cada una de las cuales est├âãÆ├é┬í ligada a un elemento diferente y gobernada por un dios (arconte) diferente. La historia sigue a The Traveller, un aventurero interestelar que, al comienzo del juego, se separa de su hermano gemelo despu├âãÆ├é┬®s de que los dos aterrizan en Teyvat. A partir de entonces, el Viajero viaja a trav├âãÆ├é┬®s de las naciones de Teyvat en busca del hermano perdido, acompa├âãÆ├é┬▒ado por su gu├âãÆ├é┬¡a, Paimon . En el camino, los dos se hacen amigos de innumerables personas, se involucran en los asuntos de sus naciones y comienzan a desentra├âãÆ├é┬▒ar los misterios de la tierra.', 'miHoYo', 'https://genshin.hoyoverse.com/es/company/about', 'https://www.youtube.com/watch?v=TAlKhARUcoY&ab_channel=GenshinImpact', '2020-09-28', NULL),
(2, 'The Forest', 'The Forest es un videojuego de terror y supervivencia desarrollado y publicado por Endnight Games. El juego se desarrolla en una remota pen├âãÆ├é┬¡nsula densamente boscosa, donde el personaje del jugador Eric LeBlanc debe luchar contra monstruos can├âãÆ├é┬¡bales, mientras busca a su hijo Timmy despu├âãÆ├é┬®s de un accidente a├âãÆ├é┬®reo.', 'Endnight Games Ltd', 'https://store.steampowered.com/agecheck/app/242760/?l=spanish', 'https://www.youtube.com/watch?v=7mwn5U2PNvk&ab_channel=GameSpot', '2014-05-30', NULL),
(3, 'Subnautica', 'Desciende a las profundidades de un mundo submarino alien├âãÆ├é┬¡gena lleno de belleza y peligros. Crea equipamiento, pilota submarinos, terraforma el terreno, y burla los peligros para explorar exhuberantes arrecifes de coral, volcanes, sistemas de cuevas y m├âãÆ├é┬ís - Todo mientras intentas sobrevivir.', 'Unknown Worlds Entertainment', 'https://store.steampowered.com/app/264710/Subnautica/?l=spanish', 'https://www.youtube.com/watch?v=_7BzngvURrk&ab_channel=Subnautica', '2018-01-23', NULL),
(4, 'The Witcher 4: Wild Hunt', 'Geralt de Rivia se embarca en una nueva aventura en un vasto mundo lleno de monstruos, magia y decisiones morales difíciles.', 'CD Projekt Red', 'https://www.gog.com/game/the_witcher_4', 'https://www.youtube.com/watch?v=IjwZYHojxlk', '2023-11-15', NULL),
(5, 'Cyberpunk 2078', 'Explora Night City, una metrópolis obsesionada con el poder, la moda y las modificaciones corporales. Sumérgete en una historia llena de intriga, traición y acción.', 'CD Projekt Red', 'https://www.gog.com/game/cyberpunk_2078', 'https://www.youtube.com/watch?v=-Iy30Usiuxg', '2022-12-10', NULL),
(6, 'Red Dead Redemption 3', 'Únete a Arthur Morgan en su última aventura en el salvaje oeste, donde tendrá que enfrentarse a la ley, los forajidos y su propio pasado turbio.', 'Rockstar Games', 'https://www.rockstargames.com/reddeadredemption3', 'https://www.youtube.com/watch?v=eaW0tYpxyp0', '2024-08-20', NULL),
(7, 'Final Fantasy XVI', 'Sumérgete en un mundo de fantasía épica donde la magia y la tecnología se entrelazan. Acompaña a un grupo de héroes en su lucha contra las fuerzas oscuras que amenazan con destruir el mundo.', 'Square Enix', 'https://finalfantasy.square-enix-games.com/es-es/home', 'https://www.youtube.com/watch?v=YFNqpMv8V5A', '2023-09-05', NULL),
(8, 'Elden Ring', 'Explora un mundo abierto vasto y lleno de peligros en esta nueva aventura de acción y rol. Descubre antiguos secretos y desafía a los poderosos señores de la noche.', 'FromSoftware', 'https://www.eldenring.com/', 'https://www.youtube.com/watch?v=E3WiVxVbgB0', '2024-02-25', NULL),
(9, 'Horizon Forbidden West', 'Acompaña a Aloy en su viaje hacia el oeste en busca de respuestas sobre el origen de las máquinas y el destino de la humanidad. Descubre nuevos paisajes y enfréntate a nuevas amenazas en este juego de aventuras y exploración.', 'Guerrilla Games', 'https://www.playstation.com/en-us/games/horizon-forbidden-west/', 'https://www.youtube.com/watch?v=Lq594XmpPBg', '2022-12-08', NULL),
(10, 'Assassin\'s Creed: Ragnarok', 'Únete a un grupo de vikingos en su búsqueda de riquezas y gloria en los reinos nórdicos. Explora vastos paisajes, lucha en batallas épicas y descubre los misterios de la mitología nórdica.', 'Ubisoft', 'https://www.ubisoft.com/en-us/game/assassins-creed-ragnarok', 'https://www.youtube.com/watch?v=9yVgXwRpJDY', '2023-06-15', NULL),
(11, 'The Last of Us Part III', 'Continúa la historia de Ellie y Joel en un mundo post-apocalíptico lleno de peligros y desafíos. Enfréntate a nuevas amenazas y toma decisiones difíciles en esta emocionante secuela.', 'Naughty Dog', 'https://www.playstation.com/en-us/games/the-last-of-us-part-iii/', 'https://www.youtube.com/watch?v=Gb3anZ0sEXw', '2024-04-30', NULL),
(12, 'Halo Infinite', 'Únete al Jefe Maestro en su lucha contra los alienígenas Covenant en este emocionante juego de disparos en primera persona. Descubre nuevos mundos, combate en intensas batallas y desvela los secretos de los Anillos de Halo.', '343 Industries', 'https://www.halowaypoint.com/', 'https://www.youtube.com/watch?v=HZtc5-syeAk', '2023-11-15', NULL),
(13, 'God of War: Ragnarok', 'Acompaña a Kratos y a su hijo Atreus en una nueva aventura por los reinos nórdicos. Enfréntate a dioses y monstruos mientras buscas la forma de detener el Ragnarok y salvar al mundo de la destrucción.', 'Santa Monica Studio', 'https://www.playstation.com/en-us/games/god-of-war-ragnarok/', 'https://www.youtube.com/watch?v=L5i2jEMe8OM', '2024-09-10', NULL),
(14, 'Death Stranding 2', 'Sumérgete en un mundo post-apocalíptico donde la conexión entre las personas es más importante que nunca. Explora paisajes desolados, construye puentes entre comunidades y descubre los secretos del Death Stranding.', 'Kojima Productions', 'https://www.kojimaproductions.jp/', 'https://www.youtube.com/watch?v=KhsrYK3ZLds', '2023-05-20', NULL),
(15, 'Starfield', 'Embárcate en un viaje épico a través del espacio en busca de nuevos mundos y civilizaciones en este juego de rol y exploración. Descubre los secretos del universo mientras te enfrentas a peligros desconocidos en las fronteras finales.', 'Bethesda Game Studios', 'https://bethesda.net/en/game/starfield', 'https://www.youtube.com/watch?v=17tkz4SKA8k', '2023-10-25', NULL),
(16, 'Bayonetta 4', 'Únete a la bruja Bayonetta en otra aventura llena de acción y extravagancia. Combate contra hordas de ángeles y demonios mientras desatas poderosos ataques y hechizos.', 'PlatinumGames', 'https://www.platinumgames.com/games/bayonetta-4', 'https://www.youtube.com/watch?v=n2sG7PQcR8U', '2024-07-12', NULL),
(17, 'Uncharted: Legacy of Thieves Collection', 'Revive las emocionantes aventuras de Nathan Drake en esta colección remasterizada de los clásicos de Uncharted: The Lost Legacy y Uncharted 4: A Thief\'s End. Descubre tesoros ocultos, resuelve enigmas y enfrenta peligros mortales en estos dos emocionantes capítulos de la saga Uncharted.', 'Naughty Dog', 'https://www.playstation.com/en-us/games/uncharted-legacy-of-thieves-collection/', 'https://www.youtube.com/watch?v=ioGAb_FbDWg', '2022-10-05', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `games_genders`
--

DROP TABLE IF EXISTS `games_genders`;
CREATE TABLE `games_genders` (
  `id_gender` int(11) NOT NULL,
  `id_game` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
CREATE TABLE `games_maps` (
  `id_map` int(11) NOT NULL,
  `id_game` int(11) DEFAULT NULL,
  `url_map` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `games_plataforms`
--

DROP TABLE IF EXISTS `games_plataforms`;
CREATE TABLE `games_plataforms` (
  `id_plataform` int(11) NOT NULL,
  `id_game` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

DROP TABLE IF EXISTS `rols`;
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

DROP TABLE IF EXISTS `type_actions`;
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

DROP TABLE IF EXISTS `type_genders`;
CREATE TABLE `type_genders` (
  `id_type_gender` int(2) NOT NULL,
  `name_gender` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(3, 'PC'),
(4, 'Nintendo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `email` varchar(100) NOT NULL,
  `username` varchar(15) DEFAULT NULL,
  `password` text NOT NULL,
  `date_creation` date DEFAULT NULL,
  `rol_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`email`, `username`, `password`, `date_creation`, `rol_user`) VALUES
('JacketKawaii@gmail.com', 'Jack_uwu', 'Jacket1234', '2024-05-12', 2),
('Nahuelhidalgo1204@gmail.com', 'Darling1204', 'Nahuel123456', '2024-04-20', 1),
('usuariorandom@gmail.com', 'random1234', 'random1234', '2024-04-20', 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `codes_confirm`
--
ALTER TABLE `codes_confirm`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id_comment`),
  ADD KEY `user` (`user`),
  ADD KEY `id_game` (`id_game`),
  ADD KEY `fk_comment` (`parent_comment`);

--
-- Indices de la tabla `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `title` (`title`);

--
-- Indices de la tabla `games_genders`
--
ALTER TABLE `games_genders`
  ADD PRIMARY KEY (`id_gender`,`id_game`),
  ADD KEY `id_game` (`id_game`);

--
-- Indices de la tabla `games_maps`
--
ALTER TABLE `games_maps`
  ADD PRIMARY KEY (`id_map`),
  ADD KEY `id_game` (`id_game`);

--
-- Indices de la tabla `games_plataforms`
--
ALTER TABLE `games_plataforms`
  ADD PRIMARY KEY (`id_plataform`,`id_game`),
  ADD KEY `id_game` (`id_game`);

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
  MODIFY `id_comment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `games_maps`
--
ALTER TABLE `games_maps`
  MODIFY `id_map` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rols`
--
ALTER TABLE `rols`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `type_actions`
--
ALTER TABLE `type_actions`
  MODIFY `id_type_actions` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `type_genders`
--
ALTER TABLE `type_genders`
  MODIFY `id_type_gender` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `type_plataform`
--
ALTER TABLE `type_plataform`
  MODIFY `id_type_plataform` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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

DELIMITER $$
--
-- Eventos
--
DROP EVENT IF EXISTS `delete_registers`$$
CREATE DEFINER=`root`@`localhost` EVENT `delete_registers` ON SCHEDULE EVERY 1 MINUTE STARTS '2024-05-15 17:59:15' ON COMPLETION NOT PRESERVE ENABLE DO DELETE FROM codes_confirm WHERE TIMESTAMPDIFF(MINUTE, date_creation, NOW()) > 4$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
