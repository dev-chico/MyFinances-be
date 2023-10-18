const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
  const token = request.headers.authorization;

  if (!token) {
    return response.status(403).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, 'A$Jg3Lp@9F!k2zTq#oP5s^W8c', (err, decoded) => {
    if (err) {
      return response.status(401).json({ error: 'Token inválido' });
    }

    request.userId = decoded.userId;
    next();
  });
};
