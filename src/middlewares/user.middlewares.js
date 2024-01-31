const { User } = require('../models');

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};
  
const checkIfExists = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return true;
  }
};
  
const nameLength = (displayName) => {
  if (typeof displayName !== 'string' || displayName.length < 8) {
    return true;
  }
};
  
const passwordLength = (password) => password.length >= 6;
  
const validateMiddleware = (req, res, next) => {
  const { email, displayName, password } = req.body;
  
  if (!validateEmail(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  
  if (nameLength(displayName)) {
    return res.status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }
  
  if (!passwordLength(password)) {
    return res.status(400)
      .json({ message: '"password" length must be at least 6 characters long' });
  }
  
  next(); // Chama o próximo middleware ou a rota principal
};
  
module.exports = {
  validateMiddleware,
  checkIfExists,
};
