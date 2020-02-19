import jwt from 'jsonwebtoken';
import authJwtConfig from '../../config/auth_jwt';
import { promisify } from 'util';

export default async (req, res, next) => {
  const authHeaderToken = req.headers.authorization;

  if (!authHeaderToken) {
    return res.status(401).json({ error: 'Token not provided.' });
  }

  const [, token] = authHeaderToken.split(' '); //[bearer,token]

  try {
    //dados do user do token
    const decoded = await promisify(jwt.verify)(token, authJwtConfig.secret);
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid.' });
  }
};
