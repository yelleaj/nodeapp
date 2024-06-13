const { Sequelize, DataTypes } = require('sequelize');

// Replace with your own database credentials
const sequelize = new Sequelize('Login_Registerpage', 'postgres', 'Bharath@04', {
  host: 'localhost',
  dialect: 'postgres' // Change based on your database
});

// Define a new model for form submissions
const app = sequelize.define('submitform', {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  countryCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address2: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  tableName: 'submitform', // Specify the table name
  timestamps: true // Automatically adds `createdAt` and `updatedAt`
});

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(error => {
    console.error('Unable to sync database:', error);
  });


module.exports = app;
