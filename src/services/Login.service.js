const JWT = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;
console.log(User);
const login = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  if (!user) return null;
  console.log('USER = ', user);
  return JWT.sign({ data: email, id: user.id }, JWT_SECRET, { expiresIn: '15d' });
};

module.exports = login;
