import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import UserModel from '../models/User';
import File from '../models/File';
import authJwtConfig from '../../config/auth_jwt';

class SessionController {
  async store(req, res) {
    //Validações
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { email, password } = req.body;

    const user = await UserModel.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    //401
    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }

    //Senha incorreta
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    //gerando token
    const { id, name, provider, avatar } = user;

    return res.json({
      user: { id, name, email, provider, avatar },
      token: jwt.sign({ id }, authJwtConfig.secret, {
        expiresIn: authJwtConfig.expiresIn,
      }),
    });
  }
}
export default new SessionController();
