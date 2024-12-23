const userDB = require("../db/userDB");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const axios = require("axios");

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

async function getUserByEmail(email) {
  const user = await userDB
    .getUserByEmail(email)
    .catch((err) => console.error("User not noud", err));

  return user;
}

async function getUsers(req, res) {
  const users = await userDB
    .getUsers()
    .catch((err) => console.error("No users", err));

  res.json(users);
}

async function getUsersInteractedWith(req, res) {
  const userID = req.user.id;
  const users = await userDB
    .getUsersInteractedWith(userID)
    .catch((err) => console.error("No users", err));

  res.json(users);
}

async function addUserInteraction(req, res) {
  const userID = req.user.id;
  try {
    const userInteractedWith = await getUserByUsername(req.body.username);
    if (!userInteractedWith) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (userID === userInteractedWith.id) {
      res
        .status(409)
        .json({ message: "Can not start a conversation with yourself" });
      return;
    }

    const existingUser = await userDB.getUserInteractedWith(
      userID,
      userInteractedWith.id
    );

    if (existingUser) {
      res.status(409).json({ message: "Interaction already exists" });
      return;
    }

    await userDB.addUserInteraction(userID, userInteractedWith.id);
    res.json(userInteractedWith);
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
}

function generateToken(id) {
  const token = jwt.sign({ id }, jwtSecret, {
    expiresIn: jwtExpiresIn,
  });

  return token;
}

async function signup(req, res) {
  const { username, password, fullName, email } = req.body;
  let existingUser = await getUserByUsername(username);

  if (existingUser) {
    return res.status(409).json({ message: "Username is alread taken" });
  }

  existingUser = await getUserByEmail(email);

  if (existingUser) {
    return res.status(409).json({
      message: "An account with this email already exist, log in instead",
    });
  }

  let imageUrl;
  const gravatarUserInfo = await tryGetUserInfoFromGravatar(req, res);

  if (gravatarUserInfo) {
    imageUrl = gravatarUserInfo.avatar_url;
  }

  const hasedPassword = await bcrypt.hash(password, 10);

  const user = await userDB
    .addUser(username, hasedPassword, fullName, email, imageUrl)
    .catch((err) => console.log(err));

  const token = generateToken(user.id);
  res.json({ token });
}

async function tryGetUserInfoFromGravatar(req, res) {
  const { email } = req.body;

  try {
    const hash = crypto
      .createHash("sha256")
      .update(email.trim().toLowerCase())
      .digest("hex");

    const response = await axios.get(
      `https://api.gravatar.com/v3/profiles/${hash}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GRAVATAR_API_KEY}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Faild fetching from Gravatar", error);
  }
}

async function login(req, res) {
  function LoginFailedResponse(res) {
    return res.status(400).json({ message: "Wrong username or password" });
  }

  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username).catch((err) =>
      console.error("User not noud", err)
    );

    if (!user) {
      return LoginFailedResponse(res);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return LoginFailedResponse(res);
    }

    const token = generateToken(user.id);
    res.json({ token });
  } catch (error) {
    return LoginFailedResponse(res);
  }
}

async function addMessage(senderId, recieverId, content) {
  try {
    const message = await userDB.addMessage(senderId, recieverId, content);
    return message;
  } catch (error) {
    return null;
  }
}

async function getMessagesBetweenTwoUsers(req, res) {
  try {
    const firstUserId = req.user.id;
    const secondUserId = parseInt(req.params.recieverId);
    const messages = await userDB.getMessagesBetweenTwoUsers(
      firstUserId,
      secondUserId
    );
    res.json(messages);
  } catch (error) {
    res.status(400).json({ message: error });
  }
}

async function getAllMessagesRelatedToUser(req, res) {
  try {
    const userId = req.user.id;
    const messages = await userDB.getAllMessagesRelatedToUser(userId);
    res.json(messages);
  } catch (error) {
    res.status(400).json({ message: error });
  }
}

async function getFriendRequestsOfUser(req, res) {
  try {
    const userId = req.user.id;
    const freinedRequests = await userDB.getFreindRequestsOfUser(userId);
    res.json(freinedRequests);
  } catch (error) {
    res
      .status(401)
      .json({ message: "Faild fetching freind requests of a user", error });
  }
}

async function addFriendRequest(req, res) {
  try {
    const userId = req.user.id;
    const recieverId = parseInt(req.params.recieverId);

    const freinedRequest = await userDB.addFreindRequest(userId, recieverId);
    res.json(freinedRequest);
  } catch (error) {
    res.status(401).json({ message: "Faild sending a freind request", error });
  }
}

async function removedFreindRequest(req, res) {
  try {
    const freindRequestId = parseInt(req.params.freindRequestId);

    await userDB.removeFreindRequest(freindRequestId);
    res.end();
  } catch (error) {
    res.status(401).json({ message: "Faild removing a freind request", error });
  }
}

async function acceptFreindRequest(req, res) {
  try {
    const freindRequestId = parseInt(req.params.freindRequestId);
    await userDB.acceptFreindRequest(freindRequestId);
    res.end();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Faild accepting a freind request", error });
  }
}

module.exports = {
  signup,
  login,

  getUserById,
  getUserByUsername,
  getUserByEmail,
  getUsers,

  getUsersInteractedWith,
  addUserInteraction,

  addMessage,
  getMessagesBetweenTwoUsers,
  getAllMessagesRelatedToUser,

  addFriendRequest,
  removedFreindRequest,
  getFriendRequestsOfUser,
  acceptFreindRequest,
};
