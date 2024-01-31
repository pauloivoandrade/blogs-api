const UserService = require('../services/User.service');

const user = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { status, data } = await UserService(displayName, email, password, image);

  return res.status(status).json(data);
};

module.exports = {
  user,
};
