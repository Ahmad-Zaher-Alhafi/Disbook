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

async function getPostsOfUSer(req, res) {
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

module.exports = { createPost, getPostsOfUSer, getPosts };
