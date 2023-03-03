const connection = require("../config/connection");
const { User, Thought } = require("../models");

const {
  getRandomUsername,
  getRandomArrItem,
  genRandomIndex,
  getRandomThought,
} = require("./data");

connection.on("error", (err) => err);

// Creates a connection to mongodb
connection.once("open", async () => {
  console.log("connected");
  // Delete the entries in the collection
  await User.deleteMany({});
  await Thought.deleteMany({});

  //Creating thought Data
  const thoughtCreation = getRandomThought(5);
  await Thought.collection.insertMany(thoughtCreation);

  //creating user data

  //creates 10 users to database
  const users = [];
  // const newUser = [];

  // for (i = 0; i < 10; i++) {
  //   const myUser = getRandomUsername();
  //   newUser.push({ myUser });
  // }

  for (let i = 0; i < 10; i++) {
    const username = getRandomUsername();
    const split = username.split(" ");
    const split1 = split[0];
    const split2 = split[1];
    const email = `${split1}${split2}@gmail.com`;

    users.push({
      username: username,
      email,
      thoughts: [thoughtCreation[genRandomIndex(thoughtCreation)]._id],
      // friends: [users[genRandomIndex(users)]._id],
    });
  }

  await User.collection.insertMany(users);

  console.table(User);
  console.table(Thought, ["thoughText", "username", "reactions"]);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
