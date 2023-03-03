const reactionSchema = require("../models/Reaction");

const username = [
  "Aaran",
  "Aaren",
  "Aarez",
  "Aarman",
  "Aaron",
  "Aaron-James",
  "Aarron",
  "Aaryan",
  "Aaryn",
  "Aayan",
  "Aazaan",
  "Abaan",
  "Abbas",
  "Abdallah",
  "Abdalroof",
  "Abdihakim",
  "Abdirahman",
  "Abdisalam",
  "Abdul",
  "Abdul-Aziz",
  "Abdulbasir",
  "Abdulkadir",
  "Abdulkarem",
  "Smith",
  "Jones",
  "Coollastname",
  "Ze",
  "Zechariah",
  "Zeek",
  "Zeeshan",
  "Zeid",
  "Zein",
  "Zen",
  "Zendel",
  "Zenith",
  "Zennon",
  "Zeph",
  "Zerah",
  "Zhen",
  "Zhi",
  "Zhong",
  "Zhuo",
  "Zi",
  "Zidane",
  "Zijie",
  "Zinedine",
  "Zion",
  "Zishan",
  "Ziya",
  "Ziyaan",
  "Zohaib",
  "Zohair",
  "Zoubaeir",
  "Zubair",
  "Zubayr",
  "Zuriel",
  "Xander",
  "Jared",
  "Grace",
  "Alex",
  "Mark",
  "Tamar",
  "Farish",
  "Sarah",
  "Nathaniel",
  "Parker",
];

const thoughts = [
  "Decision Tracker",
  "Find My Phone",
  "Learn Piano",
  "Starbase Defender",
  "Tower Defense",
  "Monopoly Money Manager",
  "Movie trailers",
  "Hello world",
  "Stupid Social Media App",
  "Notes",
  "Messages",
  "Compass",
  "Firefox",
  "Running app",
  "Cooking app",
  "Poker",
  "Deliveries",
];

const reactions = [
  "lorem",
  "imsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "curabitur",
  "vel",
  "hendrerit",
  "libero",
  "eleifend",
  "blandit",
  "nunc",
  "ornare",
  "odio",
  "ut",
  "orci",
  "gravida",
  "imperdiet",
  "nullam",
  "purus",
  "lacinia",
  "a",
  "pretium",
  "quis",
];

const getRandomArrItem = (item) => {
  return item[Math.floor(Math.random() * item.length)];
};

const genRandomIndex = (arr) => Math.floor(Math.random() * arr.length);

const getRandomUsername = () => {
  return `${getRandomArrItem(username)} ${getRandomArrItem(username)} `;
};
//ThoughtSchema => ThoughtText: In seed.js get a random thought by calling getRandomarrayitem(thoughts)
//ThoughtSchema => get username in seed.js after pushing users. tags: [tags[genRandomIndex(tags)]._id] excersice 24

//Reaction
const getRandomReaction = (int) => {
  if (int === 1) {
    return getRandomArrItem(reactions);
  }

  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(reactions),
      username: getRandomUsername(),
    });
  }
  return results;
};

const getRandomThought = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughText: getRandomArrItem(thoughts),
      username: getRandomUsername(),
      reactions: [...getRandomReaction(2)],
    });
  }
  return results;
};

module.exports = {
  getRandomUsername,
  getRandomArrItem,
  genRandomIndex,
  getRandomThought,
};
