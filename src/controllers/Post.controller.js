const { addPost, getPost, getPostById, updatePost } = require('../services/Post.service');

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
async function updateIdPost(req, res) {
  const { id: userId } = req.user;
  const { title, content } = req.body;
  const { id } = req.params;
  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const updatedPost = await updatePost(id, userId, req.body);

  res.status(updatedPost.status).json(updatedPost.data);
}

module.exports = {
  addNewPost,
  getUsers,
  getById,
  updatePost,
  updateIdPost,
};