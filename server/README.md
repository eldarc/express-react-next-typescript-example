# Example - TypeScript Express.js App
## Getting started
- Clone this repo.
- `yarn install` to install all required dependencies
- Install MongoDB or just use the provided `docker-compose.dev.yml` (make commands available).
- Copy the `.env.example` file to `.env` and configure the environment variables.
- If using MongoDB with the help of `docker-compose`, use the following `MONGO_URI` variable: `MONGODB_URI=mongodb://127.0.0.1:27020/app`
- `yarn run dev` to start the local server.
- `yarn run test` to run tests.

### Available Makefile commands
- `start-mongo` - start the MongoDB container with Docker. Alternatively use the following command: `docker-compose -f ./docker-compose.dev.yml up -d`
- `start-mongo-verbose` - start the MongoDB container with Docker and show output. Alternatively use the following command: `docker-compose -f ./docker-compose.dev.yml up`
- `stop-mongo` - stop the MongoDB container. Alternatively use the following command: `docker-compose -f ./docker-compose.dev.yml stop`
- `remove-mongo` - remove the MongoDB container. Alternatively use the following command: `docker-compose -f ./docker-compose.dev.yml down`

### Dockerfile
- To build use provided script: `./docker-build.sh`
- To run use the provided script: `./docker-run.sh`
- For now, Dockerfile is only for deployment purposes. There are currently no configurations set up for local development with Docker.
