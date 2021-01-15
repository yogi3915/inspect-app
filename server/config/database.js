const { MongoClient, ObjectID } = require('mongodb');
const { MongoMemoryServer } = require("mongodb-memory-server");

const mongo = new MongoMemoryServer();


const databaseUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const databaseName = process.env.DATABASE_NAME || 'workspace';

const client = new MongoClient(databaseUrl, { useUnifiedTopology: true });

client.connect();

const db = client.db(databaseName);

module.exports = { ObjectID, db };
