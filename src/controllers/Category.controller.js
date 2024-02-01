const { addCategory } = require('../services/Categories.service');

const newCategory = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await addCategory(name);

  return res.status(status).json(data);
};

module.exports = {
  newCategory,
};