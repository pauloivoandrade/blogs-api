const { Category } = require('../models');

const addCategory = async (name) => {
  // console.log('ESTOU AQUI', categoryData);
  if (!name) {
    return { status: 400, data: { message: '"name" is required' } };
  }
  const newCategory = await Category.create({ name });
  return { status: 201, data: newCategory };
};

module.exports = {
  addCategory,
};
