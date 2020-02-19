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
    console.log(req.userId);
    return res.json({ ok: true });
  }
}

export default new UserController();
