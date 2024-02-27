const db = require("../../models");
const User = db.users;

const findUserByEmail = async (req,res,email) => {
    return await User.findOne({ where: { email } });
};

const findUserById = async (req,res,userId) => {
    return await User.findByPk(userId);
};

const createUser = async (req,res,userData) => {
    return await User.create(userData);
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
};
