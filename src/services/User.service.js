const JWT = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const addUser = async (displayName, email, password, image) => {
  try {
    // Verificar se o usuário já existe
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return { error: 'User already registered', status: 409 };
    }

    // Criar um novo usuário
    const user = await User.create({ displayName, email, password, image });
    if (!user) {
      return { error: 'Failed to create user', status: 500 };
    }

    // Gerar token JWT
    const token = JWT.sign({ data: email }, JWT_SECRET, { expiresIn: '15d' });
    return { token, status: 201 };
  } catch (error) {
    console.error(error);
    return { error: 'Internal Server Error', status: 500 };
  }
};

module.exports = addUser;
