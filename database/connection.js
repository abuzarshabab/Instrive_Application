const { MongoClient } = require('mongodb');
require('dotenv').config()

const url = process.env.MONGO_URI;
const databaseName = process.env.DB_NAME

let db = null;

function dbInstance() {
  if (!db) {
    return connect();
  }
  if (db) return db;
}

async function connect() {
  const dbClient = new MongoClient(url);
  db = await dbClient.db(databaseName)
  return db;
}

module.exports = { dbInstance }

// const client = new MongoClient(url);

// let connection;


// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   connection = client.db(dbName);

//   return connection;
// }

// async function getConnection() {
//   if (connection) {
//     return connection;
//   }
//   await main()
//   return connection;
// }

// module.exports = { getConnection, main }
