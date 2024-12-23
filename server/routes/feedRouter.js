const { Router } = require("express");
const feedController = require("../controllers/feedController");
const passport = require("passport");

const feedRouter = Router();

feedRouter.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  feedController.getPosts
);

feedRouter.get(
  "/posts/:userId",
  passport.authenticate("jwt", { session: false }),
  feedController.getPostsOfUser
);

feedRouter.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  feedController.createPost
);

feedRouter.post(
  "/posts/:postId/likes",
  passport.authenticate("jwt", { session: false }),
  feedController.addLikeToPost
);

feedRouter.delete(
  "/likes/:likeId",
  passport.authenticate("jwt", { session: false }),
  feedController.removeLike
);

feedRouter.post(
  "/posts/:postId/comments",
  passport.authenticate("jwt", { session: false }),
  feedController.addCommentToPost
);

feedRouter.post(
  "/comments/:commentId/likes",
  passport.authenticate("jwt", { session: false }),
  feedController.addLikeToComment
);

feedRouter.delete(
  "/comments/:commentId",
  passport.authenticate("jwt", { session: false }),
  feedController.removeComment
);

module.exports = { feedRouter };
