import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

let client!: Pool;

const { HOST, DB_NAME_DEV, DB_NAME_TEST, DB_USER, DB_USER_PASSWORD, ENV } =
  process.env;

if (ENV === 'DEV') {
  client = new Pool({
    host: HOST,
    database: DB_NAME_DEV,
    user: DB_USER,
    password: DB_USER_PASSWORD,
  });
}

if (ENV === 'TEST') {
  client = new Pool({
    host: HOST,
    database: DB_NAME_TEST,
    user: DB_USER,
    password: DB_USER_PASSWORD,
  });
}

export default client;
