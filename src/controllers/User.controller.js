const UserService = require('../services/User.service');
const { validateMiddleware, checkIfExists } = require('../middlewares');

const user = async (req, res) => {
  try {
    validateMiddleware(req, res, async () => {
      const { displayName, email, password } = req.body;

      if (await checkIfExists(email)) {
        return res.status(409).json({ message: 'User already registered' });
      }

      const result = await UserService(displayName, email, password);

      if (result.error) {
        return res.status(result.status).json({ message: result.error });
      }

      return res.status(result.status).json({ token: result.token });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  user,
};
