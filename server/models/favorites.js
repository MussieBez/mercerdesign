const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
 
const FavoriteItemSchema = new mongoose.Schema(
  {
    product: { type: ObjectId, ref: "Product" },
    category: { type: ObjectId, ref: "Category"},
    name: String,
    price: Number,
    user: { type: ObjectId, ref: "User" }
  },
  { timestamps: true }
);
 
const FavoriteItem = mongoose.model("FavoriteItem", FavoriteItemSchema);
 
const FavoritesSchema = new mongoose.Schema(
  {
    // products: [FavoriteItemSchema],
    user: { type: ObjectId, ref: "User" }
  },
  { timestamps: true }
);
 
const Favorites = mongoose.model("Favorites", FavoritesSchema);
 
module.exports = { Favorites, FavoriteItem };