import UserModel from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await UserModel.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists!' });
    }

    const { id, name, email, provider } = await UserModel.create(req.body);
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;
    const user = await UserModel.findByPk(req.userId);

    //Valida email caso queira atualizar o email
    if (email && email !== user.email) {
      const userExists = await UserModel.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists!' });
      }
    }
    //validar senha caso esteja informando a anterior
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    //Atualizando usuario
    const { id, name, provider } = await user.update(req.body);
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
