import jwt from 'jsonwebtoken';
import UserModel from '../models/User';
import authJwtConfig from '../../config/auth_jwt';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ where: { email } });

    //401
    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }

    //Senha incorreta
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    //gerando token
    const { id, name } = user;

    return res.json({
      user: { id, name, email },
      token: jwt.sign({ id }, authJwtConfig.secret, {
        expiresIn: authJwtConfig.expiresIn,
      }),
    });
  }
}
export default new SessionController();
