<h1 align="center"> Alpha Eye BE</h1>
<h1 align="center"> To view Backend Deployment Repo</h1>
<h2 align="center" markdown=1>
  <a href= "https://github.com/DevPeter1454/Alpha-Eye-BE-V2.git">Backend Deployment Repo Link</a>
</h2>


<p align="center">
  <a href="https://fastapi.tiangolo.com">
    <img src="https://user-images.githubusercontent.com/43156212/277095260-ef5d4496-8290-4b18-99b2-0c0b5500504e.png" alt="Blue Rocket with FastAPI Logo as its window. There is a word FAST written" width="35%" height="auto">
  </a>
</p>

<p align="center">
  <a href="">
      <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  </a>
  <a href="https://fastapi.tiangolo.com">
      <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" alt="FastAPI">
  </a>
  <a href="https://docs.pydantic.dev/2.4/">
      <img src="https://img.shields.io/badge/Pydantic-E92063?logo=pydantic&logoColor=fff&style=for-the-badge" alt="Pydantic">
  </a>
  <a href="https://www.postgresql.org">
      <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  </a>
  <a href="https://redis.io">
      <img src="https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=fff&style=for-the-badge" alt="Redis">
  </a>
  <a href="https://docs.docker.com/compose/">
      <img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff&style=for-the-badge" alt="Docker">
  </a>
  <a href="https://nginx.org/en/">
      <img src="https://img.shields.io/badge/NGINX-009639?logo=nginx&logoColor=fff&style=for-the-badge" alt=NGINX>
  </a>
</p>

## 0. About

**Alpha-Eye-BE** makes use of an extendable async API using FastAPI, Pydantic V2, SQLAlchemy 2.0 and PostgreSQL:

- [`FastAPI`](https://fastapi.tiangolo.com): modern Python web framework for building APIs
- [`Pydantic V2`](https://docs.pydantic.dev/2.4/): the most widely used data Python validation library, rewritten in Rust [`(5x-50x faster)`](https://docs.pydantic.dev/latest/blog/pydantic-v2-alpha/)
- [`SQLAlchemy 2.0`](https://docs.sqlalchemy.org/en/20/changelog/whatsnew_20.html): Python SQL toolkit and Object Relational Mapper
- [`PostgreSQL`](https://www.postgresql.org): The World's Most Advanced Open Source Relational Database
- [`Redis`](https://redis.io): Open source, in-memory data store used by millions as a cache, message broker and more.
- [`Docker Compose`](https://docs.docker.com/compose/) With a single command, create and start all the services from your configuration.


## 1. Features

- ⚡️ Fully async
- 🚀 Pydantic V2 and SQLAlchemy 2.0
- 🔐 User authentication with JWT
- 🍪 Cookie based refresh token
- 🏬 Easy redis caching
- 👜 Easy client-side caching
- 👮 FastAPI docs behind authentication and hidden based on the environment
- 🦾 Easily extendable
- 🤸‍♂️ Flexible
- 🚚 Easy running with docker compose

## 2. Contents

0. [About](#0-about)
1. [Features](#1-features)
   1. [To Do](#11-to-do)
1. [Contents](#2-contents)
1. [Prerequisites](#3-prerequisites)
   1. [Environment Variables (.env)](#31-environment-variables-env)
   1. [Docker Compose](#32-docker-compose-preferred)
   1. [From Scratch](#33-from-scratch)
1. [Usage](#4-usage)
   1. [Docker Compose](#41-docker-compose)
   1. [From Scratch](#42-from-scratch)
      1. [Packages](#421-packages)
      1. [Running PostgreSQL With Docker](#422-running-postgresql-with-docker)
      1. [Running Redis with Docker](#423-running-redis-with-docker)
      1. [Running the API](#424-running-the-api)
   1. [Creating the first superuser](#43-creating-the-first-superuser)
   1. [Database Migrations](#44-database-migrations)
1. [Extending](#5-extending)
   1. [Project Structure](#51-project-structure)
   1. [Database Model](#52-database-model)
   1. [SQLAlchemy Models](#53-sqlalchemy-models)
   1. [Pydantic Schemas](#54-pydantic-schemas)
   1. [Alembic Migrations](#55-alembic-migrations)
   1. [CRUD](#56-crud)
   1. [Routes](#57-routes)
      1. [Paginated Responses](#571-paginated-responses)
      1. [HTTP Exceptions](#572-http-exceptions)
   1. [Caching](#58-caching)
   1. [More Advanced Caching](#59-more-advanced-caching)
   1. [ARQ Job Queues](#510-arq-job-queues)
   1. [Rate Limiting](#511-rate-limiting)
   1. [JWT Authentication](#512-jwt-authentication)
   1. [Running](#513-running)
   1. [Create Application](#514-create-application)
1. [Running in Production](#6-running-in-production)
   1. [Uvicorn Workers with Gunicorn](#61-uvicorn-workers-with-gunicorn)
   1. [Running With NGINX](#62-running-with-nginx)
      1. [One Server](#621-one-server)
      1. [Multiple Servers](#622-multiple-servers)
1. [Testing](#7-testing)
1. [Contributing](#8-contributing)
1. [References](#9-references)
1. [License](#10-license)
1. [Contact](#11-contact)

---

## 3. Prerequisites

### 3.0 Start

Start by using the template, and naming the repository to what you want.

To access all backend codes

```

cd Backend

```

<p align="left">
    <img src="https://user-images.githubusercontent.com/43156212/277866726-975d1c98-b1c9-4c8e-b4bd-001c8a5728cb.png" alt="clicking use this template button, then create a new repository option" width="35%" height="auto">
</p>
  
  Then clone the repository to your local machine:

- [Get env file to run](https://gist.github.com/DevPeter1454/1f50378be502596ed1016d8fecd47695)


> \[!WARNING\]
> Do not forget to place `docker-compose.yml` and `Dockerfile` in the `root` folder, while `.env` should be in the `src` folder.

### 3.1 Environment Variables (.env)






`ENVIRONMENT` can be one of `local`, `staging` and `production`, defaults to local, and changes the behavior of api `docs` endpoints:

- **local:** `/docs`, `/redoc` and `/openapi.json` available
- **staging:** `/docs`, `/redoc` and `/openapi.json` available for superusers
- **production:** `/docs`, `/redoc` and `/openapi.json` not available

### 3.2 Docker Compose (preferred)

To do it using docker compose, ensure you have docker and docker compose installed, then:
While in the base project directory (FastAPI-boilerplate here), run:

```sh
docker compose up
```

You should have a `web` container, `postgres` container, a `worker` container and a `redis` container running.
Then head to `http://127.0.0.1:8000/docs`.

### 3.3 From Scratch

Test using poetry
Install poetry:

```sh
pip install poetry
```

Install dependencies:

```sh
poetry-add-requirements. txt
```

Test using venv
```sh
python -m venv venv
```
```sh
source venv/bin/activate
```sh
```sh
pip install -r requirements.txt
```
To run
```sh
uvicorn app.main:app --reload
```


## 4. Usage

### 4.1 Docker Compose

If you used docker compose, your setup is done. You just need to ensure that when you run (while in the base folder):

```sh
docker compose up
```


So you may skip to [5. Extending](#5-extending).

### 4.2 From Scratch

#### 4.2.1. Running the API

While in the `root` folder, run to start the application with uvicorn server:

```sh
poetry run uvicorn src.app.main:app --reload
```

> \[!TIP\]
> The --reload flag enables auto-reload once you change (and save) something in the project



### 5.2 Database Model

Create the new entities and relationships and add them to the model <br>


#### 5.2.1 Token Blacklist

Note that this table is used to blacklist the `JWT` tokens (it's how you log a user out) <br>

### 5.3 SQLAlchemy Models



> \[!WARNING\]
> Note that since it inherits from `Base`, the new model is mapped as a python `dataclass`, so optional attributes (arguments with a default value) should be defined after required attributes.



### 5.4 Running

If you are using docker compose, just running the following command should ensure everything is working:

```sh
docker compose up
```

If you are doing it from scratch, ensure your postgres and your redis are running, then
while in the `root` folder, run to start the application with uvicorn server:

```sh
poetry run uvicorn src.app.main:app --reload
```


# Frontend codes
# React + Vite
---

# React.js + Vite + Tailwind CSS Web App

This project is a web application built with React.js, Vite, and Tailwind CSS. It provides a fast and efficient development environment for building modern web applications with a focus on performance and developer experience.

## Features

- *React.js*: A JavaScript library for building user interfaces.
- *Vite*: A build tool that focuses on speed and development experience for web projects.
- *Tailwind CSS*: A utility-first CSS framework for rapidly building custom designs.

## Getting Started

### Prerequisites

Before running the project, make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

  ```
   git clone 
  ```
   

2. Navigate into the project directory:

  ```
  cd Frontend
  ```
   

3. Install dependencies:

  ```
   npm install
  ```

### Development

To start the development server, run:

bash
npm run dev


This will start the Vite development server and open your default web browser to display the web application. The development server supports hot module replacement for fast development iteration.

### Building for Production

To build the project for production, run:

bash
npm run build


This command will build the project optimized for production deployment. The output will be generated in the dist directory.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- React.js: https://reactjs.org/
- Vite: https://vitejs.dev/
- Tailwind CSS: https://tailwindcss.com/

---

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
#



Mobile
The mobile application is developed with Flutter and is located in the mobile directory. To run the mobile app, navigate to the mobile directory and fetch the dependencies:

To run the mobile app
```
cd Mobile
```
to get all dependencies

```
flutter pub get
```
to run the application
```
flutter run
```
