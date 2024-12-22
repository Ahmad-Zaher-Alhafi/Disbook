const { Router } = require("express");
const userController = require("../controllers/userController");
const passport = require("passport");

const userRouter = Router();

userRouter.get(
  "/me/interactedWith",
  passport.authenticate("jwt", { session: false }),
  userController.getUsersInteractedWith
);

userRouter.post(
  "/me/interactedWith",
  passport.authenticate("jwt", { session: false }),
  userController.addUserInteraction
);

userRouter.get(
  "/me/messages",
  passport.authenticate("jwt", { session: false }),
  userController.getAllMessagesRelatedToUser
);

userRouter.get(
  "/me/messages/:recieverId",
  passport.authenticate("jwt", { session: false }),
  userController.getMessagesBetweenTwoUsers
);

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);

userRouter.get(
  "/isAuthorised",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);
module.exports = userRouter;
