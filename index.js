const express = require('express');
const cors = require('cors');
const {MongoClient} = require('mongodb');
require('dotenv').config();

// create app and set port:
const app = express();
const port = process.env.PORT || 5000;

// create database client:
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.fev0e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(uri);

// middlewares
app.use(cors());
app.use(express.json());

const run = async () => {
   // connect the database
   await client.connect();

   // create database:
   const database = client.db('coffeeDB');
   const coffeeCollection = database.collection('coffees');

   // default home routes
   app.get('/', async(req, res) => {
      res.send("Espresso Coffee Server is running.....")
   })

   // get all coffee route
   app.get('/coffees', async (req, res) => {
      const coffes = await coffeeCollection.find().toArray()
      res.send(coffes);
   })

   // add coffee route:
   app.post('/add-coffee', async (req, res) => {
      const coffee = req.body;
      const result = await coffeeCollection.insertOne(coffee)
      res.send(result);
   })



}
run();

// run the server:
app.listen(port, () => {
   console.log(`Expresso Coffee Server is running on port ${port}`);
});