const feedDB = require("../db/feedDB");

async function createPost(req, res) {
  try {
    const userId = req.user.id;
    const { content } = req.body;

    await feedDB.createPost(userId, content);
    res.end();
  } catch (error) {
    res.status(401).json({ message: "Faild creating a post", error });
  }
}

async function getPostsOfUser(req, res) {
  try {
    const userId = parseInt(req.params.userId);

    const post = await feedDB.getPostsOfUser(userId);
    res.json(post);
  } catch (error) {
    res.status(401).json({ message: "Faild fetching posts of user", error });
  }
}

async function getPosts(req, res) {
  try {
    const posts = await feedDB.getPosts();
    res.json(posts);
  } catch (error) {
    res.status(401).json({ message: "Faild fetching the posts", error });
  }
}

async function addLikeToPost(req, res) {
  try {
    const userId = req.user.id;
    const postId = parseInt(req.params.postId);

    const existingLike = await feedDB.getLikeOfUserOnPost(userId, postId);
    if (existingLike) {
      const error = `${req.user.username} tried to like a post that is already liked by him`;
      console.warn(error);
      res.status(401).json(error);
      return;
    }

    const like = await feedDB.addLikeToPost(userId, postId);
    res.json(like);
  } catch (error) {
    res.status(401).json({ message: "Faild adding a like to a post", error });
  }
}

async function removeLike(req, res) {
  try {
    const likeId = parseInt(req.params.likeId);
    await feedDB.removeLike(likeId);
    res.end();
  } catch (error) {
    res.status(401).json({ message: "Faild removing like from a post", error });
  }
}

module.exports = {
  createPost,
  getPostsOfUser,
  getPosts,
  addLikeToPost,
  removeLike,
};
