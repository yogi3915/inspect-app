const bcrypt = require('bcryptjs');

class Encrypt {
  static hash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  static compare(password, hashed) {
    return bcrypt.compareSync(password, hashed);
  }
}

module.exports = Encrypt;