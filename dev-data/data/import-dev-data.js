const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const mongoose = require("mongoose");
const Book = require("../../models/bookModel");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// Pour connect à mongo atlas
mongoose.connect(DB).then((connectionObject) => {
  // console.log(connectionObject.connections),
  console.log("DB CONNECTION SUCCESS");
});

// READ JSON FILE

const books = JSON.parse(
  fs.readFileSync(`${__dirname}/books-simple.json`, "utf-8")
);
// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
// const reviews = JSON.parse(
//   fs.readFileSync(`${__dirname}/reviews.json`, "utf-8")
// );

// Import data into db

const importData = async () => {
  try {
    await Book.create(books);
    // await User.create(users, { validateBeforeSave: false });
    // await Review.create(reviews);
    console.log("Data succesfully loaded");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//Delete all data from collection

const deleteData = async () => {
  try {
    await Book.deleteMany();
    // await User.deleteMany();
    // await Review.deleteMany();
    console.log("Data deleted !");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
}

if (process.argv[2] === "--delete") {
  deleteData();
}

console.log(process.argv);
