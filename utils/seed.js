const User = require("../models/User");
const {
  getRandomUsername,
  getRandomArrItem,
  genRandomIndex,
} = require("./data");

// Creates a connection to mongodb
connection.once("open", async () => {
  // Delete the entries in the collection
  await User.deleteMany({});

  //creates 10 users to database
  const users = [];

  for (let i = 0; i < 10; i++) {
    const User = {
      name: getRandomUsername(),
      mail: `${this.username}@gmail.com`,

    };
    users.push({ username: User.name, email: User.mail, });
  }
  users.forEach(() => {
    const friend = {
      friend: [users[genRandomIndex(users)]._id],
    };
    users.push({ friends: friend });
  });
});
