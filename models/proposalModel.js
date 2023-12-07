const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "You must provide a paragraph."],
    min: [200, "Paragraph length must be more than 200 characters."],
    max: [750, "Pragraph length must be less than 750 characters."],
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  paragraph: { type: mongoose.Schema.ObjectId, ref: "Paragraph" },
  likes: { type: Number, min: 0 },
  current: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Proposal = mongoose.model("Proposal", proposalSchema);

module.exports = Proposal;
