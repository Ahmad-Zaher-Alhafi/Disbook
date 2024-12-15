const userDB = require("../db/userDB");

async function addUser(req, res) {
  const { username, password, fullName, email } = req.body;
  await userDB
    .addUser(username, password, fullName, email)
    .catch((err) => console.log(err));
}

module.exports = {
  addUser,
};
