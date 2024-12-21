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
  feedController.getPostsOfUSer
);

feedRouter.post(
  "/posts/:userId",
  passport.authenticate("jwt", { session: false }),
  feedController.createPost
);

module.exports = { feedRouter };
