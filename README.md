<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Para utilizar el tamplate

- Realiza un `git clone` en tu terminal y guarda el repositorio en el directorio que gustes.
- Elimina el archivo .git de la carpeta para reiniciar el historial de git y puedas utilizar el tamplate de forma libre.
- Ejecuta el `docker compose up -d` para levantar la base de datos.
- Instala las dependencias `npm i`.
- Configura la cadena de conexion de prisma ORM en el archivo `.env`
- crea las migraciones necesarias, dependiendo tus necesidades o si ya tienes una BD utiliza el comando `npx prisma pull`

> [!WARNING]  
> Ten en cuanta las relaciones y la tabla Usuarios de tu base de datos antes de crear las migraciones.

- Ejecuta el proyecto con `npm run start:dev`
- relaiza pruebas de que todo funcione


## Funcionalidades

- Creacion de Usuarios
- Autenticacion mediante JWT
- contraseña encriptada en la base de datos
- Autorizacion mediante Roles
- Refresh Token



## License

Sistema de autenticacion [MIT licensed](LICENSE).
