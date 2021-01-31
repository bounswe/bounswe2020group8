const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var actorDefinition = {
  id: { type: String },
  type: { type: String },
  name: { type: String },
  url: { type: String },
};

var objectDefinition = {
  id: { type: Number },
  type: { type: String },
  url: { type: String },
  name: { type: String },
};

var targetDefinition = {
  id: { type: String, default: "http://www.carousel.com" },
  type: { type: String, default: "Website" },
  name: { type: String, default: "Carousel E-Commerce Platform" },
};

var activitySchema = new Schema(
  {
    "@context": { type: String, default: "https://www.w3.org/ns/activitystreams" },
    summary: { type: String },
    published: {
      type: String,
      default: function () {
        return Date.now().toString();
      },
    },
    type: { type: String, default: "Authorized Activity" },
    actor: actorDefinition,
    object: objectDefinition,
    target: targetDefinition,
  },
  {
    collection: "Activities",
  }
);

module.exports = mongoose.model("Activity", activitySchema);
