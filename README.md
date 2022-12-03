# Setup local development environment

## Setup environment variables

Open `.env.example` file. This has all the required environment variables for application.

Copy this to `.env` file.

```
cp .env.example .env
```

The app is already configured to load the environment variables from `.env` file.

## Setup local database

Make sure you have docker installed on your machine.
Run the following command:

```
docker compose up
```

This will start the MongoDB on port `27017`.
