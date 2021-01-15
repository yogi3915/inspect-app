const { MongoClient, ObjectID } = require('mongodb');

const databaseUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const databaseName = process.env.DATABASE_NAME || 'workspace'; // Ganti sesuai db kalian.
const client = new MongoClient(databaseUrl, { useUnifiedTopology: true });

client.connect();

const db = client.db(databaseName);

module.exports = { db, ObjectID };
