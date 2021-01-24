const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var commentSchema = new Schema(
  {
    mainProductId: { type: String },
    customerId: { type: String },
    text: { type: String },
    rate: { type: Number },
    postedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    collection: "Comment",
  }
);

module.exports = mongoose.model("Comment", commentSchema);
