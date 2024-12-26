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
  "/me/friendRequests",
  passport.authenticate("jwt", { session: false }),
  userController.getFriendRequestsOfUser
);

userRouter.post(
  "/me/friendRequests/:recieverId",
  passport.authenticate("jwt", { session: false }),
  userController.addFriendRequest
);

userRouter.delete(
  "/me/friendRequests/:friendRequestId",
  passport.authenticate("jwt", { session: false }),
  userController.removedfriendRequest
);

userRouter.put(
  "/me/friendRequests/:friendRequestId",
  passport.authenticate("jwt", { session: false }),
  userController.acceptfriendRequest
);

userRouter.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  userController.getUserByIdFromRequest
);

userRouter.get(
  "/me/discover",
  passport.authenticate("jwt", { session: false }),
  userController.getUsersToDiscover
);

userRouter.delete(
  "/me/friends/:friendId",
  passport.authenticate("jwt", { session: false }),
  userController.removeFriend
);

userRouter.get("/signup/guest", userController.signupAsGuest);

module.exports = userRouter;
