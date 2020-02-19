import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import UserModel from '../app/models/User';

const models = [UserModel];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
