<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript's boilerplate project provides a powerful and feature-rich foundation for developers to build upon, allowing them to focus on building their application's unique features rather than spending time on setup and configuration.

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
 |--authentication     # Secure identification and verification of user's access
 |--common             # Commonly used by other modules
 |--config\            # Environment variables and configuration related things
 |--controllers\       # Route controllers (controller layer)
 |--docs\              # Swagger files
 |--enums\             # Enums
 |--middlewares\       # Custom middlewares
 |--models\            # Models (data layer)
     |--entity\        # Entity domain module
         |--repository # Persistent layer
         |--dto        # Data transfer object
         |--service    # Business logic (service layer)
         |--controller # Routes - data flow
         |--profile    # Mapping between source and destination objects  
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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
