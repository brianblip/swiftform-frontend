// pages/api/data.js
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://MAKIENAUT:<password>@swiftform.fgbxzux.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

export default async function handler(req, res) {
   try {
      await client.connect();
      const database = client.db("forms");
      const collection = database.collection("form-collection");

      const data = await collection.find().toArray(); // You can customize the query here

      res.status(200).json(data);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
   } finally {
      await client.close();
   }
}
