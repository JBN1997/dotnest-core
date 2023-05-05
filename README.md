<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

This open-source project based on [Nest](https://github.com/nestjs/nest) Express provides a boilerplate template for fast and clean code development using best architectural standards with unit and integration testing. The project aims to provide a solid foundation for developers to build upon, with a focus on performance, scalability, and maintainability. With NestJS Express as the core framework, developers can benefit from its features, such as dependency injection, middleware support, and modular architecture, to build robust applications. The project also emphasizes the importance of testing by including unit and integration testing, ensuring that the code meets the required standards. Overall, this project offers a strong foundation for building scalable and maintainable applications with clean code and adherence to architectural best practices.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Formatting

```bash
# apply prettier code formatter
$ yarn run format
```

## Structure

### Project

```
src\
 |--authentication\    # Secure identification and verification of user's access
 |--common\            # Commonly used by other modules
 |--config\            # Environment variables and configuration related things
 |--controllers\       # Route controllers (controller layer)
 |--docs\              # Swagger files
 |--enums\             # Enums
 |--middlewares\       # Custom middlewares
 |--models\            # Models (data layer)
     |--entity\        # Entity domain module
         |--repository\# Persistent layer
         |--dto\       # Data transfer object
         |--service\   # Business logic (service layer)
         |--controller\# Routes - data flow
         |--profile\   # Mapping between source and destination objects  
 |--utils\             # Utility classes and functions
 |--validations\       # Request data validation schemas
 |--jobs\              # Queue consumers/providers and recurring/scheduled
 |--server.ts          # Nest server boostrap
 |--main.ts            # App server entry point
```

### Environment Variables
The environment variables can be found and modified in the .env file.

## Docker

Every time you add a new package to your package.json file or make any changes to it or the .env.docker file, please consider rebuilding the docker image using: 

```bash
docker-compose down && docker-compose up --build
```

## License

Nest is [MIT licensed](LICENSE).
