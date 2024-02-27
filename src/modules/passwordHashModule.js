const bcrypt = require("bcrypt");

const hashPassword = async (password, saltRounds) => {
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (err) {
    return err;
  }
};

module.exports = {
  hashPassword,
};
