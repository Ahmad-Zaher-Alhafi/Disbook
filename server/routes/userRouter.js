const { Router } = require("express");
const userController = require("../controllers/userController");
const passport = require("passport");

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("<h1> Hey there</h1>");
  res.end();
});

userRouter.post("/users", userController.signup);
userRouter.post("/users/login", userController.login);
userRouter.get("/profile", passport.authenticate("jwt"), (req, res) => {
  console.log("Profile accessed");
  res.end();
});

module.exports = userRouter;
