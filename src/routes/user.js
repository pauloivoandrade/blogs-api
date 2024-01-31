const { Router } = require('express');
const user = require('../controllers/User.controller');

const route = Router();

route.post('/', user.user);

module.exports = {
  route,
};