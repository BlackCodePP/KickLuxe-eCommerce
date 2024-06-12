# KickLuxe

Este proyecto es un eCommerce fullstack de calzado, desarrollado utilizando Angular, PHP y Bootstrap, entre otras tecnologías. El sitio cuenta con categorización de productos obtenidos desde la base de datos a través de una API, formularios con validaciones en el inicio de sesión y registro, funcionalidad de carrito de compras, registro de pedidos y un diseño completamente responsive. Además, he implementado mejoras para optimizar el rendimiento y la seguridad del sitio, con planes para futuras actualizaciones.

Este proyecto fue generado con Angular CLI versión 17.2.3.

## Configuración de la base de datos

Para probar la aplicación en local, necesitarás configurar tu propia base de datos. Puedes encontrar el script de la base de datos en `src/app/database`.

1. Crea una nueva base de datos en tu sistema de gestión de bases de datos preferido.
2. Ejecuta el script de la base de datos para configurar la estructura de la base de datos.
3. Abre el archivo `src/app/api/api.php` y rellena las variables `$servername`, `$username`, `$password` y `$dbname` con los detalles de tu base de datos.

## Servidor de desarrollo

Ejecuta `ng serve` para un servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias alguno de los archivos de origen.

## Generación de código

Ejecuta `ng generate component component-name` para generar un nuevo componente. También puedes usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Construcción

Ejecuta `ng build` para construir el proyecto. Los artefactos de construcción se almacenarán en el directorio `dist/`.

## Ejecución de pruebas unitarias

Ejecuta `ng test` para ejecutar las pruebas unitarias a través de Karma.

## Ayuda adicional

Para obtener más ayuda sobre Angular CLI, usa `ng help` o visita la página de [Angular CLI Overview and Command Reference](https://angular.io/cli).
