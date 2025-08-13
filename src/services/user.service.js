const User = require('../models/user.model');

const getAllUsers = async () => {
     const users = [
      { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
      { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
      { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' }
    ];
    return users;
  //return await User.findAll();
};


module.exports = { getAllUsers };
