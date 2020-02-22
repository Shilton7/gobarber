'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    //tabela + nome coluna
    return queryInterface.addColumn('users', 'avatar_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'files', //Tabela FK
        key: 'id', //Coluna Fk
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
