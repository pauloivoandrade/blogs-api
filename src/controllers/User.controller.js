const { addUser, getUser, getById } = require('../services/User.service');

const user = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { status, data } = await addUser(displayName, email, password, image);

  return res.status(status).json(data);
};

const getUsers = async (_req, res) => {
  const { status, data } = await getUser();
  
  return res.status(status).json(data);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await getById(id);

  return res.status(status).json(data);
};
module.exports = {
  user,
  getUsers,
  getUserById,
};
