const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('UsersDonation', {
    donatorId: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',  // Ensure this matches the table name 'users'
        key: 'id',
      },
    },
    donationId: {  // Fix the typo here
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'donations',  // Ensure this matches the table name 'donations'
        key: 'id',
      },
    },
    amount: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    message: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    }
  },  // Define table name explicitly
  );
};
