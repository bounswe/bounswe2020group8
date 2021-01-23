const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var actorDefinition = {
  _id: { type: Schema.Types.ObjectId, ref: "Client" },
  type: { type: String },
  name: { type: String },
  url: { type: String },
};

var objectDefinition = {
  _id: { type: Number },
  type: { type: String },
  url: { type: String },
  name: { type: String },
};

var activitySchema = new Schema(
  {
    "@context": { type: String, default: "https://www.w3.org/ns/activitystreams" },
    summary: { type: String },
    published: { type: Date, default: Date.now },
    actor: actorDefinition,
    object: objectDefinition,
    target: { type: String, default: null },
  },
  {
    collection: "Activities",
  }
);

module.exports = mongoose.model("Activity", activitySchema);
