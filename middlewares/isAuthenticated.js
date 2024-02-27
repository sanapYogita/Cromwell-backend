const jwt = require('jsonwebtoken');

// Middleware to check authentication using JWT token
const isAuthenticated = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing token' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next(); // If everything is successful, move to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

module.exports = isAuthenticated;
