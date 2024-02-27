# Cromwell Backend

This is the backend of the Cromwell project with Register, Login, Get user details functionalities.

## Installation

1. Clone the repository:

   ```bash

   git clone https://github.com/sanapYogita/Cromwell-backend.git


2. Navigate to the project directory:

cd Cromwell-backend

3. npm install

4. Create a .env file in the root of the project. Copy the content from .env.example and update the following values:

    DB_NAME: Your PostgreSQL database name
    DB_USER: Your PostgreSQL database username
    DB_PASSWORD: Your PostgreSQL database password
    JWT_SECRET: Your secret key for JWT authentication
    Save the changes.

5. Create the required database in PostgreSQL.

6. Run migration to create tables in the database

7. npm run migrate

8. To start server
    npm start


