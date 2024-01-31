const { Router } = require('express');
const user = require('../controllers/User.controller');
const { userValidation } = require('../utils/userValidation');

const route = Router();

route.post('/', userValidation, user.user);

module.exports = {
  route,
};