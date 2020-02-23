import * as Yup from 'yup';
import UserModel from '../models/User';
import AppointmentModel from '../models/Appointment';
import { startOfHour, parseISO, isBefore } from 'date-fns';

class AppointmentController {
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
      return res
        .status(400)
        .json({ error: 'Appointment date is not available.' });
    }

    const appointment = await AppointmentModel.create({
      date: horaDateInformed, //data agendamento
      user_id: req.userId, //id do token logado
      provider_id, //prestador
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
