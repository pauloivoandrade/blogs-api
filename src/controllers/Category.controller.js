const { addCategory, getCategories } = require('../services/Categories.service');

const newCategory = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await addCategory(name);

  return res.status(status).json(data);
};
const getCategorys = async (_req, res) => {
  const { status, data } = await getCategories();
    
  return res.status(status).json(data);
};

module.exports = {
  newCategory,
  getCategorys,
};