const Sequelize = require('sequelize');
const {v4: uuidv4} = require("uuid")

module.exports = (sequelize) => {
  return sequelize.define('user', {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
            allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.DataTypes.ENUM('admin', 'donator'),  
      allowNull: false,
      defaultValue: 'donator',
    },
  });
};
