const { Router } = require("express");
const userController = require("../controllers/userController");
const passport = require("passport");

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("<h1>Welcome to Disbook server</h1>");
  res.end();
});

userRouter.get(
  "/users/me/interactedWith",
  passport.authenticate("jwt", { session: false }),
  userController.getUsersInteractedWith
);

userRouter.post(
  "/users/me/interactedWith",
  passport.authenticate("jwt", { session: false }),
  userController.addUserInteraction
);

userRouter.get(
  "/users/me/messages",
  passport.authenticate("jwt", { session: false }),
  userController.getAllMessagesRelatedToUser
);

userRouter.post(
  "/users/me/messages",
  passport.authenticate("jwt", { session: false }),
  userController.addMessage
);

userRouter.get(
  "/users/me/messages/:recieverId",
  passport.authenticate("jwt", { session: false }),
  userController.getMessagesBetweenTwoUsers
);

userRouter.post("/users", userController.signup);
userRouter.post("/users/login", userController.login);

userRouter.get(
  "/users/isAuthorised",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);
module.exports = userRouter;
