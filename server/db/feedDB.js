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
    const posts = await prisma.post.findMany();
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

async function onPrismaException(error) {
  console.error(error);
}

module.exports = { createPost, getPosts, getPostsOfUser };
