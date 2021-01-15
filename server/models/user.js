const { ObjectID, db } = require('../config/database');
const usersCollection = db.collection(process.env.COLLECTION_NAME || 'Users');
const { hash } = require('../helpers/encrypt');

class User {
  static async getUser(id) {
    return await usersCollection.findOne({ "_id": ObjectID(id) });
  }

  static async getUserByEmail(email) {
    return await usersCollection.findOne({ "email": email });
  }

  static async register(payload) {
    return await usersCollection.insertOne({...payload, password: hash(payload.password) });
  }
}

module.exports = User