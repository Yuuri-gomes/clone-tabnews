import { Client } from "pg";

async function connectDatabase() {
  const client = new Client(databaseAccessConfiguration());
  await client.connect();
  return client;
}

function databaseAccessConfiguration() {
  const databaseObjectConfiguration = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  };
  return databaseObjectConfiguration;
}

async function query(queryObject) {
  const client = await connectDatabase();
  const result = await client.query(queryObject);
  await client.end();
  return result;
}

export default {
  query: query,
};
