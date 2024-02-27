const jwt = require('jsonwebtoken');

const generateToken = (userId, jwtSecret, jwtExpiry) => {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: jwtExpiry });
};

module.exports = {
  generateToken,
};
