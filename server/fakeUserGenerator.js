const { faker } = require("@faker-js/faker");
const userDB = require("./db/userDB");

const minUsersCount = 100;
const seed = 123;

faker.seed(seed);

function createRandomUser() {
  return {
    fullName: faker.internet.displayName(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

async function populateUsersTable() {
  const usersCount = await userDB.getUsersCount();

  if (usersCount < minUsersCount) {
    const usersData = faker.helpers.multiple(createRandomUser, {
      count: minUsersCount - usersCount,
    });

    const users = await userDB.addUsers(usersData);

    console.log(users);
  }
}

populateUsersTable();
