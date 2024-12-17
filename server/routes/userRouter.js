const { Router } = require("express");
const userController = require("../controllers/userController");
const passport = require("passport");

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

module.exports = userRouter;
