import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  // Associate FK
  static associate(models) {
    this.belongsTo(models.UserModel, { foreignKey: 'user_id', as: 'user' }); //Models + Coluna Fk + apelido
    this.belongsTo(models.UserModel, {
      foreignKey: 'provider_id',
      as: 'provider',
    });
  }
}

export default Appointment;
