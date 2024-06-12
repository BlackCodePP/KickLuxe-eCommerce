-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-06-2024 a las 11:26:17
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `kickluxe`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `email`, `password`) VALUES
(1, 'prueba', 'prueba@gmail.com', 'prueba123'),
(3, 'prueba2', 'prueba2@gmail.com', 'prueba123'),
(4, 'prueba3', 'prueba3@gmail.com', 'prueba123'),
(5, 'tres', 'prueba4@gmail.com', 'PPp12345678'),
(6, 'asdasd', 'prueba6@gmail.com', 'Prueba123'),
(8, 'fsdfdsf', 'prueba7@gmail.com', '$2y$10$.aF8GmBVR6pRsHvyMl66yOldeKjOYL1gTP.w6tSdf063gMQm77zjW'),
(9, 'fsfdsfsd', 'prueba8@gmail.com', '$2y$10$4Oy23Xcg5SuWIO96eLstJOAZzashOavGN3p807TR0aXvS.vflDPP6'),
(10, 'prueba9', 'prueba9@gmail.com', '$2y$10$UykNFZlpLyHLuK8v15R7eO3PTHvc3K/rhV/hIn9pvn7KOLuIl2UGu'),
(11, 'prueba10', 'prueba10@gmail.com', '$2y$10$x3hs73n9s8yuUDjbRMnY6uQS/7UrapowifnfU4zuHX4UBkXrrE9yq'),
(12, 'prueba11', 'prueba11@gmail.com', '$2y$10$1zPYSB9/hmpuDrqGCwaohuFptzQvW/6xcIkA.3hj/Xx/9j4Hvxok.'),
(13, 'prueba12', 'prueba12@gmail.com', '$2y$10$PCIIHQiII.bB4pFdu86brOF4WthOTsMQFOhfjsoCKCPr7aRY8cn5.'),
(14, 'prueba13', 'prueba13@gmail.com', '$2y$10$3iYKEv/I.lEjNiReHtMf6.ilq4hstrNleWas1K7iAmMgeYKIIJh5e'),
(15, 'ffdssdf', 'prueba21@gmail.com', '$2y$10$epHD1OgQLCBa465/35LUZOkR8TZIv9Yc3vO6I0091x7URbhq84mQK'),
(16, 'Suggar', 'minovioguapo@gmail.com', '$2y$10$nO9XwNYd1SH4gaf.fP7jvuIo1BWWaprPJUiqSctWsqDTDVOIgnpZe'),
(17, 'prueba20', 'prueba20@gmail.com', '$2y$10$hUzsfKQmNWaUwhcOm3Emm.hZpxxb68W4asKJW6ha9w3H3xlGnodAG'),
(18, 'asdas', 'prueba22@gmail.com', '$2y$10$4.EllKZQUcypWFAsGHYa0eFRKcbuCxSHCImFewz.vCKjZu1OvtITK'),
(19, 'prueba50', 'prueba50@gmail.com', '$2y$10$qiAsbcOVLzZOE3AbfEJRKOSvkdt5cDzAfz6K82L9I2xLknQ6PypWu'),
(20, 'prueba60', 'prueba60@gmail.com', '$2y$10$LMAHXW2vyEYeAShwDGxAVuiRMVQhwmPs2dQixnwtn4COl0ZDtEvEG'),
(21, 'prueba70', 'prueba70@gmail.com', '$2y$10$l/8L7gMWDxnZtN1ejpRiPegmizmolWA/ulfOO8dd7T849dyQUadO6'),
(22, 'Prueba71', 'prueba71@gmail.com', '$2y$10$WzUmTEt4EHpoqWGeIQfANO.NdWps/hRMdHG1YuN0xisHN5eVJF12.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

CREATE TABLE `detalle_pedido` (
  `pedido_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `talla` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `detalle_pedido`
--

INSERT INTO `detalle_pedido` (`pedido_id`, `producto_id`, `talla`) VALUES
(2, 1, 40),
(2, 2, 38),
(3, 2, 38),
(3, 2, 44),
(3, 1, 40),
(3, 6, 47),
(3, 12, 46),
(3, 12, 45),
(3, 12, 41),
(3, 12, 38),
(3, 10, 43),
(4, 8, 40),
(4, 8, 41),
(4, 11, 46),
(5, 8, 41),
(5, 8, 38),
(5, 11, 46),
(6, 8, 41),
(6, 8, 38),
(6, 11, 46),
(7, 8, 40),
(7, 8, 43),
(7, 11, 46),
(8, 8, 41),
(9, 8, 40),
(9, 8, 45),
(9, 8, 47),
(10, 4, 40),
(10, 3, 47),
(10, 2, 39),
(10, 2, 47),
(10, 2, 40),
(10, 2, 39),
(10, 2, 40),
(10, 2, 47),
(12, 4, 44),
(12, 3, 40),
(12, 2, 39),
(13, 4, 39),
(13, 3, 47),
(14, 4, 0),
(14, 3, 0),
(15, 4, 39),
(15, 3, 41),
(16, 1, 40),
(16, 2, 42),
(16, 3, 38),
(16, 4, 47),
(16, 4, 45),
(16, 4, 40),
(16, 4, 38),
(17, 1, 38),
(17, 3, 46),
(18, 18, 40),
(18, 17, 44),
(18, 17, 47),
(19, 18, 39),
(20, 1, 39),
(20, 3, 44),
(21, 18, 38),
(21, 18, 39),
(21, 18, 40),
(22, 2, 38),
(22, 15, 46),
(23, 8, 38),
(24, 4, 38),
(24, 18, 38),
(24, 5, 47),
(25, 1, 40),
(25, 1, 39),
(25, 1, 38),
(25, 1, 42),
(25, 1, 40),
(25, 1, 42),
(25, 1, 38),
(25, 1, 45),
(25, 1, 41),
(25, 1, 42),
(25, 1, 43),
(25, 1, 44),
(25, 1, 44),
(25, 1, 41),
(25, 1, 39),
(25, 1, 45),
(25, 1, 42),
(25, 1, 40),
(25, 1, 39),
(25, 1, 47),
(25, 1, 38),
(25, 1, 46),
(26, 1, 40),
(26, 1, 43),
(26, 1, 39),
(26, 2, 44),
(26, 3, 40),
(27, 6, 38),
(27, 6, 40),
(27, 6, 44),
(27, 6, 47),
(28, 13, 40),
(29, 2, 40),
(29, 3, 47),
(30, 3, 40),
(31, 5, 41),
(31, 8, 45),
(32, 18, 40),
(32, 18, 44),
(32, 16, 40),
(32, 15, 38),
(33, 3, 39),
(33, 11, 44),
(34, 15, 40),
(34, 10, 40),
(34, 16, 41),
(34, 16, 41),
(34, 18, 40),
(35, 2, 41),
(35, 3, 44),
(35, 6, 42),
(37, 3, 41),
(37, 5, 40),
(37, 6, 46),
(37, 6, 43),
(37, 6, 40),
(38, 2, 41),
(38, 8, 40),
(38, 8, 44),
(38, 8, 39),
(38, 8, 46);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `precio_total` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `cliente_id`, `fecha`, `precio_total`) VALUES
(2, 1, '2024-05-06 16:58:04', 0),
(3, 9, '2024-05-06 17:04:26', 0),
(4, 8, '2024-05-06 17:19:02', 0),
(5, 8, '2024-05-06 17:25:31', 0),
(6, 8, '2024-05-06 17:28:47', 0),
(7, 8, '2024-05-07 17:16:25', 0),
(8, 8, '2024-05-07 17:25:06', 0),
(9, 8, '2024-05-07 17:36:28', 0),
(10, 9, '2024-05-07 17:40:21', 0),
(11, 9, '2024-05-07 17:53:42', 0),
(12, 9, '2024-05-07 17:56:34', 0),
(13, 9, '2024-05-07 18:09:37', 0),
(14, 9, '2024-05-07 18:09:53', 0),
(15, 9, '2024-05-07 18:11:57', 0),
(16, 9, '2024-05-07 18:12:31', 0),
(17, 9, '2024-05-07 18:16:30', 0),
(18, 8, '2024-05-08 16:14:57', 0),
(19, 8, '2024-05-08 16:17:42', 0),
(20, 9, '2024-05-13 17:19:33', 0),
(21, 8, '2024-05-15 16:02:03', 300),
(22, 8, '2024-05-15 16:05:57', 249.98),
(23, 8, '2024-05-17 13:52:54', 109.99),
(24, 17, '2024-05-18 13:06:39', 324.97),
(25, 8, '2024-05-18 13:09:51', 2639.78),
(26, 8, '2024-05-23 15:31:54', 589.95),
(27, 8, '2024-05-24 10:39:10', 479.96),
(28, 18, '2024-05-24 11:12:32', 109.99),
(29, 9, '2024-05-24 12:32:46', 229.98),
(30, 8, '2024-05-25 14:08:14', 89.99),
(31, 8, '2024-05-26 16:01:04', 214.98),
(32, 20, '2024-05-28 15:28:59', 459.96),
(33, 20, '2024-05-28 15:30:08', 279.98),
(34, 21, '2024-05-28 19:34:51', 659.95),
(35, 21, '2024-05-28 19:35:56', 349.97),
(36, 22, '2024-06-11 10:40:31', 0),
(37, 22, '2024-06-11 11:06:26', 554.95),
(38, 22, '2024-06-11 11:07:25', 579.95);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `marca` varchar(15) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `marca`, `imagen`) VALUES
(1, 'Nike Air Force 1 Low', 'White-White', 119.99, 'Nike', 'Nike Air Force 1 Low White-White.webp'),
(2, 'Nike Air Force 1 Low', 'Black-Anthracite-Black', 139.99, 'Nike', 'Nike Air Force 1 Low Black-Anthracite-Black.webp'),
(3, 'Nike Air Force 1 Low', 'Summit White-Photo Blue', 89.99, 'Nike', 'Nike Air Force 1 Low Summit White-Photo Blue.webp'),
(4, 'Nike Blazer Mid', 'White-White', 119.99, 'Nike', 'Nike Blazer Mid White.webp'),
(5, 'Nike Dunk Low', 'Malachite-Photo Blue-Black', 104.99, 'Nike', 'Nike Dunk Low Malachite-Photo Blue-Black.webp'),
(6, 'Nike Air Max 270', 'White-Pink Glaze-Pink Salt', 119.99, 'Nike', 'Nike Air Max 270 White-Pink Glaze-Pink Salt.webp'),
(7, 'adidas Superstar XLG', 'White-White-Gold Met', 119.99, 'Adidas', 'adidas Superstar XLG White-White-Gold Met.webp'),
(8, 'adidas Gazelle', 'Preloved Green-Cloud White', 109.99, 'Adidas', 'adidas Gazelle Preloved Green-Cloud White.webp'),
(9, 'New Balance 550', 'Beige-Blue', 139.99, 'New Balance', 'New Balance 550 Beige-Blue.webp'),
(10, 'New Balance 2002R', 'Black 001-Black 001', 149.99, 'New Balance', 'New Balance 2002R Black 001-Black 001.webp'),
(11, 'Jordan 1 Retro High OG', 'Black-Royal Blue-White', 189.99, 'Jordan', 'Jordan 1 Retro High OG Black-Royal Blue-White.webp'),
(12, 'Jordan 1 Low', 'White-Black-Varsity Red', 129.99, 'Jordan', 'Jordan 1 Low White-Black-Varsity Red.webp'),
(13, 'Jordan 1 Mid', 'Chutney-Celestial Gold-Lucky G', 109.99, 'Jordan', 'Jordan 1 Mid Chutney-Celestial Gold-Lucky G.webp'),
(14, 'Vans Authentic', 'Black-Black-White', 64.99, 'Vans', 'Vans Authentic Black-Black-White.webp'),
(15, 'Vans Sk8-Hi MTE', 'Black-True White', 109.99, 'Vans', 'Vans Sk8-Hi MTE Black-True White.webp'),
(16, 'Puma MB.03', 'Yellow-Black', 149.99, 'Puma', 'Puma MB.03 Yellow-Black.webp'),
(17, 'Puma Cali Court Jeux Sets', 'Marshmallow-Navy', 59.99, 'Puma', 'Puma Cali Court Jeux Sets Marshmallow-Navy.webp'),
(18, 'Puma Suede XL', 'Team Royal-White', 99.99, 'Puma', 'Puma Seude XL Team Royal-White.webp');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD KEY `pedido_id` (`pedido_id`,`producto_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cliente_id` (`cliente_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_pedido_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
