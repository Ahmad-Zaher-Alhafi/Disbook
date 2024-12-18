const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function addUser(username, password, fullName, email) {
  try {
    const user = await prisma.user.create({
      data: {
        username: username,
        password: password,
        fullName: fullName,
        email: email,
      },
    });

    return user;
  } catch (error) {
    await onPrismaException(error);
  }
}

async function addUsers(usersData) {
  try {
    const users = await prisma.user.createMany({
      data: usersData,
    });

    return users;
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

async function getUsersCount() {
  try {
    const count = await prisma.user.count();
    return count;
  } catch (error) {
    await onPrismaException(error);
  }
}

async function getUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    await onPrismaException(error);
  }
}

async function getUsersInteractedWith(userId) {
  try {
    const interactions = await prisma.interaction.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        users: true,
      },
    });

    const usersExceptMe = interactions.flatMap((interaction) =>
      interaction.users.filter((user) => user.id !== userId)
    );
    return usersExceptMe;
  } catch (error) {
    await onPrismaException(error);
  }
}

async function getUserInteractedWith(userId, userInteractedWithId) {
  try {
    const user = await prisma.interaction.findFirst({
      where: {
        AND: [
          {
            users: {
              some: {
                id: userId,
              },
            },
          },
          {
            users: {
              some: {
                id: userInteractedWithId,
              },
            },
          },
        ],
      },
    });

    return user;
  } catch (error) {
    await onPrismaException(error);
  }
}

async function addUserInteraction(userId, interactedWithUserId) {
  try {
    const interaction = await prisma.interaction.create({
      data: {
        users: {
          connect: [{ id: userId }, { id: interactedWithUserId }],
        },
      },
    });

    return interaction;
  } catch (error) {
    await onPrismaException(err);
  }
}

async function onPrismaException(error) {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
}

module.exports = {
  addUser,
  addUsers,
  getUserById,
  getUserByUsername,
  getUsersCount,
  getUsers,
  getUsersInteractedWith,
  addUserInteraction,
  getUserInteractedWith,
};
