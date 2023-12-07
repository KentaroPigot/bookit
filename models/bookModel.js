const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A book must have a name"],
    trim: true,
  },
  paragraphs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Paragraph",
    },
  ],
  category: {
    type: String,
    enum: {
      values: ["SF", "Horror", "Thriller", "Romance", "History", "Adventure"],
    },
  },
  // contributors: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  likes: {
    type: Number,
    default: 0,
    min: [0, "Likes must be above 1"],
  },
  // imageCover: {
  //   type: String,
  // },
  createAt: { type: Date, default: Date.now },
});

bookSchema.pre(/^find/, function (next) {
  this.populate({ path: "paragraphs" });
  next();
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
