const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function addUser(username, password, fullName, email) {
  try {
    await prisma.user.create({
      data: {
        username: username,
        password: password,
        fullName: fullName,
        email: email,
      },
    });
  } catch (error) {
    await onPrismaException(error);
  }
}

async function getUserById(id) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  } catch (error) {
    await onPrismaException(error);
  }
}

async function getUserByUsername(username) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    return user;
  } catch (error) {
    await onPrismaException(error);
  }
}

async function onPrismaException(error) {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
}

module.exports = {
  addUser,
};
