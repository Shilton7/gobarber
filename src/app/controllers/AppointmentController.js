import UserModel from '../models/User';
import AppointmentModel from '../models/Appointment';
import * as Yup from 'yup';

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

    const appointment = await AppointmentModel.create({
      date, //data agendamento
      user_id: req.userId, //id do token logado
      provider_id, //prestador
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
