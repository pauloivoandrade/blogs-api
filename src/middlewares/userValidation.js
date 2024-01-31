const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};
    
const nameLength = (displayName) => {
  if (typeof displayName !== 'string' || displayName.length < 8) {
    return true;
  }
};
    
const passwordLength = (password) => password.length >= 6;
    
const userValidation = async (req, res, next) => {
  const { displayName, email, password } = await req.body;
  
  if (nameLength(displayName)) {
    return res.status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
    
  if (!passwordLength(password)) {
    return res.status(400)
      .json({ message: '"password" length must be at least 6 characters long' });
  }
  next();
};
    
module.exports = {
  userValidation,
};
