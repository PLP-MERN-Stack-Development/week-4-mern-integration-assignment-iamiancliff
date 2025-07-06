const { verifyToken } = require('../utils/auth');

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = verifyToken(token);
    console.log('Decoded token:', decoded); 
    if (!decoded || !decoded.id) {
      console.error('Token decoding error: No id field', decoded);
      return res.status(401).json({ message: 'Invalid token payload' });
    }
    req.user = { id: decoded.id }; // Explicitly set id
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    res.status(401).json({ message: error.message });
  }
};

module.exports = authenticate;