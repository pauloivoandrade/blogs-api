const Sequelize = require('sequelize');
const { BlogPost, PostCategory, Category, User } = require('../models');

const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);
const addPost = async ({ title, content, categoryIds, userId }) => {
  const categories = await Category.findAll({ where: { id: categoryIds } });
  if (categories.length !== categoryIds.length) {
    return { status: 400, data: { message: 'one or more "categoryIds" not found' } };
  }
  const result = await sequelize.transaction(async (t) => {
    const newPost = await BlogPost.create({ title, content, userId }, { transaction: t });
    const postCategories = categories
      .map((category) => ({ postId: newPost.id, categoryId: category.id,
      }));
    await PostCategory.bulkCreate(postCategories, { transaction: t });
    return { status: 201, data: newPost };
  });
  return result;
};
const getPost = async () => {
  const getPosts = await BlogPost.findAll({ include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ] });
  return { status: 200, data: getPosts };
};
const getPostById = async (id) => {
  const getPostId = await BlogPost.findByPk(
    id,
    { include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ] },
  );
  if (!getPostId) {
    return { status: 404, data: { message: 'Post does not exist' } };
  }
  return { status: 200, data: getPostId };
};
const updatePost = async (id, userId, postData) => {
  const getPostId = await BlogPost.findByPk(id, { include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ] });
  if (userId !== getPostId
    .user.dataValues.id) return { status: 401, data: { message: 'Unauthorized user' } };
  console.log('OLHA O LOG AQUI = ', getPostId.user.dataValues.id, userId);
  const { title, content } = postData;
  await getPostId.update({ title, content });
  return { status: 200, data: getPostId };
};
module.exports = {
  addPost,
  getPost,
  getPostById,
  updatePost,
};
