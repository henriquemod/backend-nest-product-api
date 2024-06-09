<div align="center">
  <h1>An API for managing products</h1>
</div>

<br />

<!-- Table of Contents -->

# Table of Contents

- [About the Project](#about-the-project)
  - [Tech Stack](#tech-stack)
  - [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Start the server](#start-the-server)
- [Usage](#usage)
- [Documentation](#documentation)
- [Tests](#tests)

<!-- About the Project -->

## About the Project

<!-- TechStack -->

### Tech Stack

  <ul>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://nestjs.com/">Nest.js</a></li>
    <li><a href="https://www.docker.com/">Docker</a></li>
    <li><a href="https://www.mongodb.com/">MongoDB</a></li>
  </ul>

<!-- Env Variables -->

### Environment Variables

This project has only 2 envs:

`DB_HOST` _default: 127.0.0.1_

`DB_NAME` _default: product-api_

<!-- Getting Started -->

## Getting Started

This project was builded with **NodeJS v21.7.3** but older versions should work just fine

<!-- Prerequisites -->

### Prerequisites

I recommend using Docker for convenience, but as long you have a MongoDB v7+ you can run this API

<!-- Installation -->

### Installation

Clone the project

```bash
  git clone https://github.com/henriquemod/backend-nest-product-api.git
```

Go to the project directory

```bash
  cd backend-nest-product-api
```

Install dependencies

```bash
  npm install
```

#### Start the server

You have 3 options when it comes to start this project:

1. Build and run in docker (recommended)

```bash
  npm run build:docker
```

_Command will build the api container and start it along site with an MongoDB_

2. Build locally with MongoDB container

```bash
  npm run dev:up

  # for development environment
  npm run start:dev

  # or for production environment
  npm run build
  npm run start:prod
```

_Command will create an MongoDB for this project on localhost and start the API_

3. Build locally with local/remote MongoDB

```bash
  # for development environment
  DB_HOST=remote.mongo.host.com DB_NAME=customDbName npm run start:dev

  # or for production environment
  npm run build
  DB_HOST=remote.mongo.host.com DB_NAME=customDbName npm run start:prod
```

<!-- Usage -->

## Usage

Once the project is started you can begin calling the API

<!-- Documentation -->

## Documentation

This API has Swagger documentation and can be found accessing http://localhost:3030/docs once you run the API

<!-- Tests -->

## Tests

You can run the tests with:

```bash
  npm run test # for unit tests
```

```bash
  npm run test:e2e # for unit e2e test
```

```bash
  npm run test:cov # for code coverage report
```
