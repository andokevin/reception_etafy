const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('etafy', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

sequelize.authenticate()
  .then(() => console.log('Connexion à la base de données réussie !'))
  .catch(err => console.error('Impossible de se connecter à la base :', err));

module.exports = sequelize;