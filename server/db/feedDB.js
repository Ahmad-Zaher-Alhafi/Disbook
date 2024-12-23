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
        comments: {
          include: {
            user: true,
            likes: true,
          },
        },
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

async function addCommentToPost(userId, postID, content) {
  try {
    const comment = await prisma.comment.create({
      data: {
        userId: userId,
        postId: postID,
        content: content,
      },
      include: {
        user: true,
      },
    });

    return comment;
  } catch (error) {
    await onPrismaException(error);
  }
}

async function addLikeToComment(userId, commentId) {
  try {
    const like = await prisma.like.create({
      data: {
        userId: userId,
        commentId: commentId,
      },
    });

    return like;
  } catch (error) {
    await onPrismaException(error);
  }
}

async function getLikeOfUserOnComment(userId, commentId) {
  try {
    const like = await prisma.like.findFirst({
      where: {
        userId: userId,
        commentId: commentId,
      },
    });

    return like;
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
  addCommentToPost,
  addLikeToComment,
  getLikeOfUserOnComment,
};
