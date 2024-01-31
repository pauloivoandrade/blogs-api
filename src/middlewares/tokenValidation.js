const JWT = require('jsonwebtoken');

const { JWT_SECRET } = process.env || 'seusecretdetoken';

const validateToken = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(401).json({ message: 'Token not found' });
  } 
  const token = bearerToken.split(' ')[1];

  JWT.verify(token, JWT_SECRET, (err) => {
    if (err) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    next();
  });
};

module.exports = {
  validateToken,
};
