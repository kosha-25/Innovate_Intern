// middleware/authenticateToken.js
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (token == null) {
    console.log('No token provided');
    return res.sendStatus(401); // if no token, return 401
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log('Token verification failed');
      return res.sendStatus(403); // if token invalid, return 403
    }
    req.user = user;
    console.log('Authenticated user:', user);
    next();
  });
}

export default authenticateToken;
