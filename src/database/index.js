import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import UserModel from '../app/models/User';
import FileModel from '../app/models/File';
import AppointmentModel from '../app/models/Appointment';

const models = [UserModel, FileModel, AppointmentModel];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
