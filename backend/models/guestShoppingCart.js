const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var shoppingCartItem = {
  productId: { type: Schema.Types.ObjectId },
  vendorId: { type: Schema.Types.ObjectId },
  amount: { type: Number },
  price: { type: Number },
  shipmentPrice: { type: Number },
  cargoCompany: { type: String },
  title: { type: String },
  vendorName: { type: String },
  photos: [String],
};

var guestShoppingCartSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId },
    shoppingCart: [shoppingCartItem],
    lastActivity: { type: Date, default: Date.now, expires: "6h" },
  },
  { collection: "GuestShoppingCart" }
);

guestShoppingCartSchema.index({ lastActivity: 1 }, { expires: "6h" });

module.exports = mongoose.model("GuestShoppingCart", guestShoppingCartSchema);
