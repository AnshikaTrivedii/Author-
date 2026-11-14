import { MongoClient, type Db } from "mongodb";

const globalForMongo = globalThis as typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>;
};

export async function database(): Promise<Db> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is required");

  globalForMongo.mongoClientPromise ??= new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
  }).connect();

  try {
    const client = await globalForMongo.mongoClientPromise;
    return client.db(process.env.MONGODB_DB || "echoes_of_memories");
  } catch (error) {
    globalForMongo.mongoClientPromise = undefined;
    throw error;
  }
}
