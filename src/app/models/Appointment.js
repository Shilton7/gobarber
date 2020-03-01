import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        //passados
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          },
        },
        //true = pode cancelar /false = não
        cancelable: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), subHours(this.date, 2));
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  // Associate FK
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' }); //Models + Coluna Fk + apelido
    this.belongsTo(models.User, {
      foreignKey: 'provider_id',
      as: 'provider',
    });
  }
}

export default Appointment;
