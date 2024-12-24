const { Router } = require("express");
const userController = require("../controllers/userController");
const passport = require("passport");

const userRouter = Router();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);

userRouter.get(
  "/isAuthorised",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

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

userRouter.get(
  "/me/freindRequests",
  passport.authenticate("jwt", { session: false }),
  userController.getFriendRequestsOfUser
);

userRouter.post(
  "/me/freindRequests/:recieverId",
  passport.authenticate("jwt", { session: false }),
  userController.addFriendRequest
);

userRouter.delete(
  "/me/freindRequests/:freindRequestId",
  passport.authenticate("jwt", { session: false }),
  userController.removedFreindRequest
);

userRouter.put(
  "/me/freindRequests/:freindRequestId",
  passport.authenticate("jwt", { session: false }),
  userController.acceptFreindRequest
);

module.exports = userRouter;
