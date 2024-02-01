const { Router } = require('express');
const post = require('../controllers/Post.controller');
const { validateToken } = require('../middlewares/tokenValidation');

const route = Router();

route.post('/', validateToken, post.addNewPost);
route.get('/', validateToken, post.getUsers);
route.get('/:id', validateToken, post.getById);

module.exports = {
  route,
};