import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, //Virtual não existe no banco
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    //Hooks
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8); //campo + força da senha
      }
    });

    return this;
  }

  //Senha Correta
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  // Associate FK
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id' }); //Models + Coluna Fk
  }
}

export default User;
