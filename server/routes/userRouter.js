const { Router } = require("express");
const userController = require("../controllers/userController");
const passport = require("passport");

const userRouter = Router();

userRouter.get(
  "/users/me/interactedWith",
  passport.authenticate("jwt", { session: false }),
  userController.getUsersInteractedWith
);

userRouter.post("/users", userController.signup);
userRouter.post("/users/login", userController.login);

userRouter.get(
  "/users/isAuthorised",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.end();
  }
);
module.exports = userRouter;
