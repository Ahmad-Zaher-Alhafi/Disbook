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
      include: {
        friends: true,
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

async function getUserByEmail(email) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
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

async function getFreindRequestsOfUser(userId) {
  try {
    const friendRequests = await prisma.friendRequest.findMany({
      where: {
        OR: [{ senderId: userId }, { recieverId: userId }],
      },
      include: {
        sender: true,
        reciever: true,
      },
    });

    return friendRequests;
  } catch (error) {
    await onPrismaException(error);
  }
}

async function addFreindRequest(senderId, recieverId) {
  try {
    const friendRequest = await prisma.friendRequest.create({
      data: {
        senderId: senderId,
        recieverId: recieverId,
      },
    });

    return friendRequest;
  } catch (error) {
    await onPrismaException(error);
  }
}

async function removeFreindRequest(id) {
  try {
    await prisma.friendRequest.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    await onPrismaException(error);
  }
}

async function onPrismaException(error) {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
}

async function acceptFreindRequest(freindRequestId) {
  try {
    // Find the freind  request
    const freindRequest = await prisma.friendRequest.findUnique({
      where: {
        id: freindRequestId,
      },
      include: {
        sender: true,
        reciever: true,
      },
    });

    const senderId = freindRequest.sender.id;
    const recieverId = freindRequest.reciever.id;

    // update sender freinds and friendOf lists
    await prisma.user.update({
      where: {
        id: senderId,
      },
      data: {
        friends: {
          connect: {
            id: recieverId,
          },
        },

        friendOf: {
          connect: {
            id: recieverId,
          },
        },
      },
    });

    // update recievr freinds and friendOf lists
    await prisma.user.update({
      where: {
        id: recieverId,
      },
      data: {
        friends: {
          connect: {
            id: senderId,
          },
        },

        friendOf: {
          connect: {
            id: senderId,
          },
        },
      },
    });

    // Delete the freind request
    await removeFreindRequest(freindRequestId);
  } catch (error) {
    await onPrismaException(error);
  }
}

module.exports = {
  addUser,
  addUsers,

  getUserById,
  getUserByUsername,
  getUserByEmail,
  getUsersCount,
  getUsers,

  getUsersInteractedWith,
  addUserInteraction,
  getUserInteractedWith,

  addMessage,
  getMessagesBetweenTwoUsers,
  getAllMessagesRelatedToUser,

  getFreindRequestsOfUser,
  addFreindRequest,
  removeFreindRequest,
  acceptFreindRequest,
};
