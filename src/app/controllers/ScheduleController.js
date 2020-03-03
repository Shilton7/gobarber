import AppointmentModel from '../models/Appointment';
import UserModel from '../models/User';
import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

class ScheduleController {
  async index(req, res) {
    const { page = 1, date } = req.query; //paginação
    const parsedDate = parseISO(date);

    const checkUserProvider = await UserModel.findOne({
      where: { id: req.userId },
    });

    if (!checkUserProvider) {
      return res.status(401).json({ error: 'User is not a provider.' });
    }

    const appointments = await AppointmentModel.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      order: ['date'],
      limit: 20, //paginação
      offset: (page - 1) * 20, //paginação
      attributes: ['id', 'date', 'canceled_at', 'user_id'],
      include: [
        {
          model: UserModel,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (!appointments) {
      return res.json({ message: 'No appointments!' });
    }

    return res.json(appointments);
  }
}

export default new ScheduleController();
