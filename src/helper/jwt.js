const jwt = require("jsonwebtoken");

const EXPIRES_IN = 60 * 60 * 12;

const generateToken = (payload) => {
  const token = jwt.sign(
    {
      userId: payload.userId,
      email: payload.email,
    },
    "cybersoft-node26",
    {
      expiresIn: EXPIRES_IN,
    }
  );

  return {
    token,
    expiresIn: EXPIRES_IN,
  };
};

module.exports = {
  generateToken,
};
