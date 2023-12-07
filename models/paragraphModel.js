const mongoose = require("mongoose");

const paragraphSchema = new mongoose.Schema({
  content: { type: String, required: [true, "You must provide a paragraph."] },
  // author: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "User",
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Paragraph = mongoose.model("Paragraph", paragraphSchema);

module.exports = Paragraph;
