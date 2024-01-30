const { Router } = require('express');
const login = require('../controllers/Login.controller');

const route = Router();

route.post('/', login.login);

module.exports = {
  route,
};