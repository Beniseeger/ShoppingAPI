import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

let client!: Pool;

const {
  POSTGRES_HOST,
  POSTGRES_DB_DEV,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV,
} = process.env;

console.log(`ENV: ${ENV}`);

if (ENV === 'DEV') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_DEV,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

if (ENV === 'TEST') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default client;
