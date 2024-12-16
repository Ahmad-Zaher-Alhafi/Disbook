const userDB = require("../db/userDB");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = "Falafel";
const jwtExpiresIn = "1d";

async function getUserById(id) {
  const user = await userDB
    .getUserById(id)
    .catch((err) => console.error("User not noud", err));

  return user;
}

async function getUserByUsername(username) {
  const user = await userDB
    .getUserByUsername(username)
    .catch((err) => console.error("User not noud", err));

  return user;
}

function generateToken(id) {
  const token = jwt.sign({ id }, jwtSecret, {
    expiresIn: jwtExpiresIn,
  });

  return token;
}

async function signup(req, res) {
  const { username, password, fullName, email } = req.body;
  const hasedPassword = await bcrypt.hash(password, 10);

  const user = await userDB
    .addUser(username, hasedPassword, fullName, email)
    .catch((err) => console.log(err));

  const token = generateToken(user.id);
  res.json({ token });
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username).catch((err) =>
      console.error("User not noud", err)
    );

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.id);
    res.json({ token });
  } catch (error) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
}

module.exports = {
  signup,
  getUserById,
  getUserByUsername,
  login,
};
