const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function addUser(username, password, fullName, email, imgUrl) {
  try {
    const user = await prisma.user.create({
      data: {
        username: username,
        password: password,
        fullName: fullName,
        email: email,
        imgUrl: imgUrl,
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
    await onPrismaException(error);
  }
}

async function addMessage(senderId, recieverId, content) {
  try {
    const message = await prisma.message.create({
      data: {
        senderID: senderId,
        recieverID: recieverId,
        content: content,
      },
    });

    return message;
  } catch (error) {
    await onPrismaException(error);
  }
}

async function getMessagesBetweenTwoUsers(firstUserId, secondUserId) {
  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderID: firstUserId, recieverID: secondUserId },
          { senderID: secondUserId, recieverID: firstUserId },
        ],
      },
      include: {
        sender: true,
        reciever: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
  } catch (error) {
    await onPrismaException(error);
  }
}

async function getAllMessagesRelatedToUser(userId) {
  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [{ senderID: userId }, { recieverID: userId }],
      },
      include: {
        sender: true,
        reciever: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
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
  addUsers,
  getUserById,
  getUserByUsername,
  getUsersCount,
  getUsers,
  getUsersInteractedWith,
  addUserInteraction,
  getUserInteractedWith,
  addMessage,
  getMessagesBetweenTwoUsers,
  getAllMessagesRelatedToUser,
};
