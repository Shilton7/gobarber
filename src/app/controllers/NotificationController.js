import Notification from '../schemas/Notification';
import UserModel from '../models/User';

class NotificationController {
  async index(req, res) {
    //prestador
    const isProvider = await UserModel.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'Only provider can load notifications.' });
    }

    //MongoDB
    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }
  async update(req, res) {
    //MongoDB
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true }, //lida
      { new: true } //busca o dado atualizado para retornar no json
    );

    return res.json(notification);
  }
}

export default new NotificationController();
