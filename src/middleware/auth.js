import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    res.sendStatus(403);
    return;
  }

  const token = authorization.split(' ')[1];

  jwt.verify(token, 'secretKey', (error) => {
    if (error) {
      res.sendStatus(403);
      return;
    }

    req.token = token;
    next();
  });
};

export const sign = async (value, callback) => {
  jwt.sign(value, 'secretKey', callback);
};

export const getTokenIsValid = (req, res) => {
  res.status(200).send({ message: 'token is valid', token: req.token });
};
