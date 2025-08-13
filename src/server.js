require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/db');
const User = require('./models/user.model');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // await sequelize.authenticate();
    // console.log('Database connected');

    // await sequelize.sync(); // Optional: creates table if not exists

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();
