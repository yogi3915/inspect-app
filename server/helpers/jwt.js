const jwt = require('jsonwebtoken');

class Jwt {
  static sign(payload) {
    return jwt.sign(payload, 'JWT_SECRET');
  }
}

module.exports = Jwt;