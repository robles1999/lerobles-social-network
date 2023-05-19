const connection = require("../config/connection");
const { User } = require("../models");

const usersSeed = [
  {
    username: "user-a",
    email: "user-a@gmail.com",
  },
  {
    username: "user-b",
    email: "user-b@gmail.com",
  },
  {
    username: "user-c",
    email: "user-c@gmail.com",
  },
  {
    username: "user-d",
    email: "user-d@gmail.com",
  },
  {
    username: "user-e",
    email: "user-e@gmail.com",
  },
];

connection.once("open", async () => {
  await User.deleteMany({});

  await User.collection.insertMany(usersSeed);

  console.info("Seeding complete! 🌱");
  process.exit(0);
});
