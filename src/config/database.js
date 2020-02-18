module.exports = {
  dialect: 'mysql',
  host: 'localhost',
  username: 'shilton',
  password: '1234567',
  database: 'db_gobarber',
  define: {
    timestamps: true, //created e updated nas tables
    underscored: true, //tables separadas por _ (user_groups)
    underscoredAll: true, //colunas separadas por _ (user_name)
  },
};
