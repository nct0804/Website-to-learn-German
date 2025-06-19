# GermanGains - German learning platform
(Updating...)

## Table of Contents
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Installing](#installing)
4. [API Documentaion](#api-documentation)
5. [Testing](#testing)
6. [Linting](#linting)
8. [Contributors](#contributors)

## Features
- **JWT Authentication**:  Secure user authentication using JSON Web Tokens, ensuring only verified users can access protected resources.

- (Updating....)

## Tech Stack
- **Backend:** Express (Node.js)
- **Frontend:** React
- **Database:** Postgresql with Prisma ORM
- **DevOps:** Docker, GitLab CI/CD
- **Testing Framework**: (Updating...)
- **UI Library**: ShadCn, Tailwind CSS

## Installing

### Prerequisites

To run this project, you need to have the following software installed on your system:

- Node.js
- npm (Node Package Manager)

or
- Docker

You can download and install Node.js and npm from the [Node.js official site](https://nodejs.org/) and Docker by following the instructions on the Docker official site [Docker official site](https://www.docker.com/products/docker-desktop/) .


### Run app with Docker

1. Clone the git repository:
    ```
    git clone https://code.fbi.h-da.de/sttgleeee/fwe-lernplattform.git
    ```

2. Navigate to the project directory and build the Docker containers:
    ```
    docker compose up --build -d
    ```
The backend will be available at [http://localhost:3000](http://localhost:4000).  
The frontend will be available at (Updating...)

Ensure that the relevant ports are free on your system.

### Run app for local development


1. Clone the git repository:
    ```
    git clone https://code.fbi.h-da.de/sttgleeee/fwe-lernplattform.git
    ```
2. Make sure to create a .env file for both backend and frontend:
-   **Backend**
    ```
    DATABASE_URL="postgresql://germangains:germangains@db:5432/germangainsdb?schema=public"

    # JWT
    JWT_SECRET="supersecretjwtkey"
    JWT_REFRESH_SECRET="anotherrefreshsecret"
    JWT_EXPIRES_IN="1h"
    JWT_REFRESH_EXPIRES_IN="7d"

    # Server
    PORT=3000
    NODE_ENV=development


    ```
-   **Frontend**
    ```
    Updating...
    ```
3. Run either backend or frontend or the whole project:
    ```

    "start": "concurrently \"npm run start:backend\" \"npm run start:frontend\""
    
    "start:frontend": "cd frontend && npm install && npm run dev"

    "start:backend": "cd backend && npm install && npm run build && npm run start",

    ```

### Docker trouble shooting
If it occurs either the following errors, make sure to clean your docker images by using `docker-compose prune -a` 

```
    The database can't reach to db:5432
    
    Error: P1010: User was denied access on the database ⁠ (not available) ⁠
```
### Stop running the app
To stop the app when running with Docker:

```
docker compose down
```

To stop the app when running it locally (both backend and frontend):
Press `Ctrl + C` inside running terminal to stop the backend and frontend server.

## API Documentation

### Endpoints
