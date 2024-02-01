const { Router } = require('express');
const category = require('../controllers/Category.controller');

const { validateToken } = require('../middlewares/tokenValidation');

const route = Router();

route.post('/', validateToken, category.newCategory);

module.exports = {
  route,
};