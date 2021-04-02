const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const PhotoItemSchema = new mongoose.Schema(
  {
    photo: {
      data: Buffer,
      contentType: String,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    user: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const PhotoItem = mongoose.model("PhotoItem", PhotoItemSchema);

const PhotosSchema = new mongoose.Schema(
  {
    // products: [FavoriteItemSchema],
    user: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Photos = mongoose.model("Photos", PhotosSchema);

module.exports = { Photos, PhotoItem };
