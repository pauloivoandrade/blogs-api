const JWT = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const addUser = async (displayName, email, password, image) => {
  const userExists = await User.findOne({ where: { email } });
  
  if (userExists) {
    return { status: 409, data: { message: 'User already registered' } };
  }
  
  console.log('CHEGUEI AQUI', userExists);
  const user = await User.create({ displayName, email, password, image });

  if (!user) {
    return { status: 500, data: { message: 'Failed to create user' } };
  }

  const token = JWT.sign({ data: email }, JWT_SECRET, { expiresIn: '15d' });

  return { status: 201, data: { token } };
};

module.exports = addUser;