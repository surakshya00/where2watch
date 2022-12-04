# Setup local development environment

## Frontend Client (React)

### Install dependencies

To install the dependencies for frontend, run the following command:

```
npm run client:install
```

### Run development mode

To run the React app in development mode, run the following command:

```
npm run client
```

### Create a React build

To create a build for the React app, run the following command:

```
npm run client:build
```

## Backend Server

### Setup environment variables

Open `.env.example` file. This has all the required environment variables for application.

Copy this to `.env` file.

```
cp .env.example .env
```

The app is already configured to load the environment variables from `.env` file.

### Setup local database

Make sure you have docker installed and running on your machine.
Run the following command:

```
docker compose up
```

This will start the MongoDB locally and can be accessed at `http://localhost:27017`.

### Start the server

Run the following command to start the server in development mode:

```
npm run server
```
