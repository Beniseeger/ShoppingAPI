# Storefront Backend Project

## Reentering

I have updated the migration file, so each table has an own file and the tables can be created and shut down separately.
Additionally I have corrected the jwt tokens, so each token is send in the header and not the body.
With this I have corrected the tests.

## Setting up the application

### Prerequisites

Before you can start the application you need to have yarn installed on your system.
After cloning the project from github a `npm install` or `yarn` is necessary.
Next Docker will be necessary to have a postgres DB (The setup steps will be described in DB startup).
A .env file is needed with the varaibles specified in chapter DB startup and ENV File.
Create a database.json file with the following details:

`{ "dev": { "driver": "pg", "host": "127.0.0.1", "database": "dev_shopping_db", "user": "shopping_db_user", "password": "password123" }, "test": { "driver": "pg", "host": "127.0.0.1", "database": "test_shopping_db", "user": "shopping_db_user", "password": "password123" } }`

This would have not been included in a real application cause the password could be seen from everyone. This only serves for the reviewer to test the application.

### DB

#### DB startup

The database used in this project runs on port 5432 and has the following details:

- HOST=127.0.0.1
- DB_NAME_DEV=dev_shopping_db
- DB_NAME_TEST=test_shopping_db
- DB_USER=shopping_db_user
- DB_USER_PASSWORD=password123

To setup the db follow the follwing steps:

1. Run `docker compose up` to setup the postgres db
2. Connect to the db via `docker exec -it [name / id of above docker container] /bin/sh`
3. switch to postgres user: `psql --username shopping_db_user`
4. Connect to each db and run `GRANT ALL PRIVILEGES ON DATABASE dev/test_shopping_db TO shopping_db_user;`
5. In a new terminal run the command `db-migrate up` to setup all relations

#### DB schemas

The schemas of the DB are listed in the File [REQUIREMENT.md](REQUIREMENTS.md).
There are 4 tables created in this project:

- users
- products
- orders
- order_products

### Application commands

The application will run on the port 3000 (this means connecting to 0.0.0.0:3000 will connect the application when its running)

1. To start the application use: yarn watch
2. To test the application use: yarn test (the test db needs to be created before)
3. To use prettier run: yarn prettier
4. To use lint run: yarn lint

### Routes

All routes are specified in the file [REQUIREMENT.md](REQUIREMENTS.md) with all HTTP methods (i.e. [GET]).
For example the route 0.0.0.0:3000/users [GET] will return all users when the correct token is provided

### Authentication

For some routes (like /users [GET]) tokens need to be provided. These tokens need to be added in the request body as follows:
`{ "id": 1, "password": "password123" "token": "eyJdihwnudsa..." }`
A user can get a token by either creating a new user or authenticating via the /users/authenticate [POST] route.
The tokens are checked via a middleware (tokenHandlerMiddleware)

To create an initial user in the db. A token is required. For test purposes the following token may be used. (This would not be included in a productive application and serves for test purposes):
token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJmaXJzdG5hbWUiOiJ0ZXN0ZXIiLCJsYXN0bmFtZSI6ImpkaWphc2lvIiwicGFzc3dvcmQiOiIkMmIkMTAkbU5mY0Rublc4QTE0R29LMmxUVXlOLjVaWVpWaWFzNkNUWEVhWExPbFV5M01UNGhDY1MifSwiaWF0IjoxNjU1OTI3MzU0fQ.EWiPsmSiMj6YDl9Pbl9ZpYAKeJHr1quROfcvI4D5ym4

### ENV File

The env file was removed due to security reasons. But for the sake of completion, these where the values used for this project (This would not be included in a real project):
POSTGRES_HOST=127.0.0.1
POSTGRES_DB_DEV=dev_shopping_db
POSTGRES_DB_TEST=test_shopping_db
POSTGRES_USER=shopping_db_user
POSTGRES_PASSWORD=password123
SALT_ROUNDS=10
PEPPER_STRING=thisismysecurepepperstring
TOKEN_SECRET=Thisismytokensecret
ENV=DEV

# -------- Project Instructions --------

## Steps to Completion

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API.

Your first task is to read the requirements and update the document with the following:

- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.  
  **Example**: A SHOW route: 'blogs/:id' [GET]

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.  
  **Example**: You can format this however you like but these types of information should be provided
  Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape.

### 2. DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder.

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled.

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database.

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!
