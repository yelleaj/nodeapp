const { Sequelize, DataTypes } = require('sequelize');

// Replace with your own database credentials
const sequelize = new Sequelize('Login_Registerpage', 'postgres', 'Bharath@04', {
  host: 'localhost',
  dialect: 'postgres' // Change based on your database
});

const User = sequelize.define('form', {
  user_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  tableName: 'form', // Specify the table name if it's different from the model name
  timestamps: true // Automatically adds `createdAt` and `updatedAt`
});

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(error => {
    console.error('Unable to sync database:', error);
  });

module.exports = User;
