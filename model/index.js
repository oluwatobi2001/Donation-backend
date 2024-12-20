const SequelCOnfig = require('../config/sequelize');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(SequelCOnfig.DB, SequelCOnfig.USER, SequelCOnfig.PASSWORD, {
    host: SequelCOnfig.HOST,
    dialect: SequelCOnfig.dialect
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require('../model/user.model')(sequelize, Sequelize);
db.donationModel = require('../model/Donation.model')(sequelize, Sequelize)
db.UserdonationModel = require('../model/UsersDonation.model')(sequelize, Sequelize)

db.token = require('../model/token.model')(sequelize, Sequelize);
console.log(db)
module.exports= db;