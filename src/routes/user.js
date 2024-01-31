const { Router } = require('express');
const user = require('../controllers/User.controller');
const { userValidation } = require('../middlewares/userValidation');
const { validateToken } = require('../middlewares/tokenValidation');

const route = Router();

route.post('/', userValidation, user.user);
route.get('/', validateToken, user.getUsers);
route.get('/:id', validateToken, user.getUserById);

module.exports = {
  route,
};