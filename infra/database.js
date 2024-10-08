import { Client } from "pg";

async function connectDatabase() {
  const client = new Client(getNewClient());
  await client.connect();
  return client;
}

function getNewClient() {
  const databaseObjectConfiguration = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
  };
  return databaseObjectConfiguration;
}

async function query(queryObject) {
  const client = await connectDatabase();
  try {
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }
  return process.env.NODE_ENV === "production";
}
const database = {
  query,
  connectDatabase,
};

export default database;
