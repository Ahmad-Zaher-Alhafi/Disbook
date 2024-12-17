const { Router } = require("express");
const userController = require("../controllers/userController");
const passport = require("passport");
const crypto = require("crypto");
const axios = require("axios");

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("<h1> Hey there</h1>");
  res.end();
});

userRouter.get("/users", userController.getUsers);
userRouter.post("/users", userController.signup);
userRouter.post("/users/login", userController.login);

userRouter.get(
  "/users/isAuthorised",
  passport.authenticate("jwt"),
  (req, res) => {
    res.json("User is Authorised");
  }
);

userRouter.get("/users/profile/:identifier", async (req, res) => {
  const { identifier } = req.params;

  try {
    const hash = crypto
      .createHash("sha256")
      .update(identifier.trim().toLowerCase())
      .digest("hex");

    const response = await axios.get(
      `https://api.gravatar.com/v3/profiles/${hash}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GRAVATAR_API_KEY}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({
      error: error.message,
    });
  }
});

module.exports = userRouter;
