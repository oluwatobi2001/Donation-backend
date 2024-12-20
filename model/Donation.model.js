const Sequelize = require('sequelize');

const {v4: uuidv4} = require("uuid")
module.exports = (sequelize) => {
  return sequelize.define('donations', {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: Sequelize.DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      
    },
    goalAmount: {
      type: Sequelize.DataTypes.FLOAT,  // Amount should be a float for calculations
      allowNull: false,
    },
    currentAmount: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    date: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    expiresOn: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
    stillReceiving: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    postedBy: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',  // Reference the 'user' model
        key: 'id',
      },
    },
  });
};
