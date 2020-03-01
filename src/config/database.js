require('dotenv/config');

module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true, //created e updated nas tables
    underscored: true, //tables separadas por _ (user_groups)
    underscoredAll: true, //colunas separadas por _ (user_name)
  },
};
