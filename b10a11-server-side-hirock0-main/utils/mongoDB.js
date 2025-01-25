import dotenv from "dotenv";
dotenv.config();
import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function ConnectionDB() {
  try {
    // await client.connect();
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
    return client;
  } catch (err) {
    throw new Error(err);
  } finally {
    // await client.close();
  }
}

