const { addPost, getPost, getPostById } = require('../services/Post.service');

const addNewPost = async (req, res) => {
  const userId = req.user.id;
  const { title, content, categoryIds } = req.body;

  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const postData = { title, content, categoryIds, userId };
  
  const result = await addPost(postData);

  return res.status(result.status).json(result.data);
};

const getUsers = async (_req, res) => {
  const { status, data } = await getPost();
  
  return res.status(status).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await getPostById(id);

  return res.status(status).json(data);
};

module.exports = {
  addNewPost,
  getUsers,
  getById,
};