<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="150" alt="Nest Logo" /></a>
</p>

[![My Skills](https://skillicons.dev/icons?i=ts,docker,prisma,postgres,nodejs)](https://skillicons.dev)

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Para utilizar el tamplate

- Realiza un `git clone` en tu terminal y guarda el repositorio en el directorio que gustes.
- Elimina la carpeta .git de la carpeta para reiniciar el historial de git y puedas utilizar el tamplate de forma libre.
- Ejecuta el `docker compose up -d` para levantar la base de datos.
- Instala las dependencias `npm i`.
- configura las variables de entorno que necesites.
- Configura la cadena de conexion de prisma ORM en el archivo `.env`.
- crea las migraciones necesarias, dependiendo tus necesidades o si ya tienes. una BD utiliza el comando `npx prisma pull`.

> [!WARNING]  
> Ten en cuanta las relaciones y la tabla Usuarios de tu base de datos antes de crear las migraciones.

- Ejecuta el proyecto con `npm run start:dev`.
- relaiza pruebas de que todo funcione.


## Funcionalidades.

- Creacion de Usuarios.
- Autenticacion mediante JWT.
- contraseña encriptada en la base de datos.
- Autorizacion mediante Roles.
- Refresh Token.

## Como utilizar la Autorizacion por roles.

```js
  enum Role {
    ADMINISTRADOR
    USUARIO
  }

  model User {
    id        String   @id @default(uuid())
    email     String   @unique @db.VarChar(100)
    userName  String   @db.VarChar(100)
    apellido  String?  @db.VarChar(100)
    password  String   @db.VarChar(200)
    IsActive  Boolean  @default(true)
    roles     Role[]   @default([USUARIO])
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  }
```

Segun los roles definidos en tu esquema de prisma puedes agregar o quitar a tu gusto para mejor comodidad, solo tendrias que crear la migracion para crearlos o quitarlos.

Una vez definido los roles a utilizar solo tendras que usar el decorador `@Auth()` en el EndPoint que necesistes proteccion, unicamente pasandole el rol que pude tener acceso a esa ruta `@Auth(Role.ADMINISTRADOR)`.

```js
  @Get('prueba')
  @Auth(Role.ADMINISTRADOR)
  todosUsuarios(@GetUser() user: User  ){
    return {
      Ok: true,
      user
    }
  }
```
otro decorador personalizado es el `@GetUser` el cual valida el status del toke para revisar si caduco, este seria el `Regresh Toke`.


```js
 @Get('check-status-user')
  @Auth()
  checkAuthStatus(
    @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus(user);
  }
```

## Respuesta de la API Rest

```js
{
	"data": {
		"id": "a296154a-c73e-44d6-b036-a456ee649614",
		"email": "ejemplo@ejemplo.com",
		"userName": "ejemplo",
		"apellido": "ejemplo",
		"IsActive": true,
		"roles": [
			"USUARIO"
		],
		"createdAt": "2024-06-14T02:52:00.302Z",
		"updatedAt": "2024-06-14T02:52:00.302Z"
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.LWE0NTZlZTY0OTYxNCIsImlhdCI6MTcxODMkYoJUE5Fc_Jxix0y1GbQ"
}
```

## License

Sistema de autenticacion [MIT licensed](LICENSE).
