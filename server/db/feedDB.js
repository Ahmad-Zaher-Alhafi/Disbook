const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createPost(userId, content) {
  try {
    const post = await prisma.post.create({
      data: {
        userId: userId,
        content: content,
      },
    });

    return post;
  } catch (error) {
    await onPrismaException(error);
  }
}

async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
        comments: true,
        likes: true,
      },
    });
    return posts;
  } catch (error) {
    await onPrismaException(error);
  }
}

async function getPostsOfUser(userId) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        userId: userId,
      },
    });
    return posts;
  } catch (error) {
    await onPrismaException(error);
  }
}

async function addLikeToPost(userId, postId) {
  try {
    const like = await prisma.like.create({
      data: {
        userId: userId,
        postId: postId,
      },
    });

    return like;
  } catch (error) {
    await onPrismaException(error);
  }
}

async function getLikeOfUserOnPost(userId, postId) {
  try {
    const like = await prisma.like.findFirst({
      where: {
        userId: userId,
        postId: postId,
      },
    });

    return like;
  } catch (error) {
    await onPrismaException(error);
  }
}

async function removeLike(likeId) {
  try {
    await prisma.like.delete({
      where: {
        id: likeId,
      },
    });
  } catch (error) {
    await onPrismaException(error);
  }
}

async function onPrismaException(error) {
  console.error(error);
}

module.exports = {
  createPost,
  getPosts,
  getPostsOfUser,
  addLikeToPost,
  getLikeOfUserOnPost,
  removeLike,
};
