const { Photos, PhotoItem } = require("../models/gallery");
const { errorHandler } = require("../helpers/dbErrorHandler");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");


exports.photoById = (req, res, next, id) => {
    PhotoItem.findById(id)
      .populate("products.product", "name")
      .exec((err, photo) => {
        if (err || !photo) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        req.photo = photo;
        next();
      });
  };

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    console.log(err);
    console.log(fields);
    console.log(files);
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    // check for all fields

    const { description, user } = fields;

    if (!description || !user) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    let photoItem = new PhotoItem(fields);

    if (files.photo) {
      // console.log("Files Photo", files.photo)

      if (files.photo.size > 5000000) {
        return res.status(400).json({
          error: "Image should be less than 1MB in size.",
        });
      }

      photoItem.photo.data = fs.readFileSync(files.photo.path);
      photoItem.photo.contentType = files.photo.type;
    }
    console.log("POST", photoItem)

    photoItem.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.remove = (req, res) => {
  let photoId = req.params.photoId;
  PhotoItem.findById({_id:photoId})
  .then((photos) => photos.remove())
  .then((photos) => res.json(photos))
  .catch((err) => res.status(422).json(err))
};

exports.photo = (req, res, next) => {
  console.log("Req from controller",req.body);
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.read = (req, res) => {
  req.photoItem.photo = undefined;
  return res.json(req.photoItem);
};

exports.galleryList = (req, res) => {
    PhotoItem.find()
      .populate("user", "_id photo description")
      .sort("-created")
      .exec((err, photos) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(photos);
      });
  };
