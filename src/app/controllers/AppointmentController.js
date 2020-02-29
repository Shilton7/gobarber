import * as Yup from 'yup';
import UserModel from '../models/User';
import FileModel from '../models/File';
import AppointmentModel from '../models/Appointment';
import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Notification from '../schemas/Notification';

class AppointmentController {
  async index(req, res) {
    //paginação
    const { page = 1 } = req.query;

    const appointment = await AppointmentModel.findAll({
      where: { user_id: req.userId },
      order: ['date'],
      limit: 20, //paginação
      offset: (page - 1) * 20, //paginação
      attributes: ['id', 'date', 'canceled_at'],
      include: [
        {
          model: UserModel,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: FileModel,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    if (!appointment) {
      return res.json({ message: 'No appointments!' });
    }

    return res.json(appointment);
  }

  async store(req, res) {
    //Validações
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      provider_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { provider_id, date } = req.body;

    //prestador
    const isProvider = await UserModel.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      return res.status(401).json({ error: 'Provider not found!' });
    }

    //Convertendo para hora exata, removendo segundos
    const horaDateInformed = startOfHour(parseISO(date));

    //Data + hora informada já passou
    if (isBefore(horaDateInformed, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted.' });
    }

    //Provider já tem agendamento no horario solictado
    const checkAvailability = await AppointmentModel.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: horaDateInformed,
      },
    });

    if (checkAvailability) {
      return res.status(400).json({
        error: 'Appointment date is not available.',
      });
    }

    const appointment = await AppointmentModel.create({
      date: horaDateInformed, //data agendamento
      user_id: req.userId, //id do token logado
      provider_id, //prestador
    });

    // Notificar prestador de Serviço
    const user = await UserModel.findByPk(req.userId); //cliente
    const formattedDate = format(
      horaDateInformed,
      "'dia' dd 'de' MMMM', ás' H:mm'h'",
      { locale: pt }
    );

    //Mongodb
    await Notification.create({
      content: `Novo Agendamento de ${user.name} para o ${formattedDate}`,
      user: provider_id,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
