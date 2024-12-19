const userSoketIds = [];

function setUserSoketId(userId, soketId) {
  const esistingUserSoketId = userSoketIds.find(
    (userSoketId) => userSoketId.userId === userId
  );

  if (esistingUserSoketId) {
    esistingUserSoketId.soketId = soketId;
    return;
  }

  userSoketIds.push({
    userId,
    soketId,
  });
}

function getUserSoketId(userId) {
  return userSoketIds.find((userSoketId) => userSoketId.userId === userId)
    ?.soketId;
}

module.exports = { setUserSoketId, getUserSoketId };
