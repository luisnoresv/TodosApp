import { MongoClient, Database } from 'https://deno.land/x/mongo@v0.8.0/mod.ts';

let db: Database;

export const connect = () => {
  const client = new MongoClient();
  client.connectWithUri('mongodb://localhost:27017');

  db = client.database('todos-app');
};

export const getDb = () => {
  return db;
};
