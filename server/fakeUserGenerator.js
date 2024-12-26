const { faker } = require("@faker-js/faker");
const userDB = require("./db/userDB");
const feedDB = require("./db/feedDB");

const minUsersCount = 100;
const seed = 123;

faker.seed(seed);

function createRandomUser() {
  return {
    fullName: faker.internet.displayName(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    imgUrl: faker.image.avatar(),
  };
}

async function populateDatabaseTables() {
  const usersCount = await userDB.getUsersCount();

  if (usersCount < minUsersCount) {
    const usersData = faker.helpers.multiple(createRandomUser, {
      count: minUsersCount - usersCount,
    });

    await userDB.addUsers(usersData);
    await createRandomPosts();

    console.log("Num of generated fake users: ", users);
  }
}

async function createRandomPosts() {
  const users = await userDB.getUsers();

  users.forEach(async (user) => {
    const numOfPostsToCreateForUser = (Math.random() + 1) * 3;

    const userId = user.id;

    for (let index = 0; index < numOfPostsToCreateForUser; index++) {
      const randomParagrphCount = (Math.random() + 1) * 5;
      const content = faker.lorem.paragraphs(randomParagrphCount);
      await feedDB.createPost(userId, content);
    }
  });
}

populateDatabaseTables();
