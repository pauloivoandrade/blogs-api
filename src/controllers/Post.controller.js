const { addPost, getPost } = require('../services/Post.service');

const addNewPost = async (req, res) => {
  const userId = req.user.id;
  const { title, content, categoryIds } = req.body;
  console.log('USER ID', userId);

  console.log('USER ID', userId);
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
module.exports = {
  addNewPost,
  getUsers,
};