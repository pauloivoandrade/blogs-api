const Sequelize = require('sequelize');
const { BlogPost, PostCategory, Category } = require('../models');

const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const addPost = async ({ title, content, categoryIds, userId }) => {
  const categories = await Category.findAll({ where: { id: categoryIds } });
  console.log('CATEGORIAS = ', categories);
  if (categories.length !== categoryIds.length) {
    return { status: 400, data: { message: 'one or more "categoryIds" not found' } };
  }
  const result = await sequelize.transaction(async (t) => {
    const newPost = await BlogPost.create({ title, content, userId }, { transaction: t });
    const postCategories = categories
      .map((category) => ({ postId: newPost.id, categoryId: category.id,
      }));
    console.log(newPost);
    await PostCategory.bulkCreate(postCategories, { transaction: t });
    return {
      status: 201,
      data: newPost,
    };
  });
  return result;
};

module.exports = {
  addPost,
};
