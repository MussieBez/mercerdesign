const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { Order } = require("../models/order");
const { Favorites } = require("../models/favorites")
const { Photos } = require("../models/gallery")

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.update = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to perform this action",
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
    }
  );
};

exports.addOrderToUserHistory = (req, res, next) => {
  let history = [];

  req.body.order.products.forEach((item) => {
    history.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.count,
      transition_id: req.body.order.transition_id,
      amount: req.body.order.amount,
    });
  });

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { history: history } },
    { new: true },
    (error, result) => {
      if (error) {
        return res.status(400).json({
          error: "Could not update user purchase history",
        });
      }
      next();
    }
  );
};

exports.purchaseHistory = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .sort("-created")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(orders);
    });
};


exports.addOrderToUserFavorites = (req, res, next) => {
  let favorites = [];
  console.log("Body", req.body)
    favorites.push({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price
    });
  

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { favorites: favorites } },
    { new: true },
    (error, result) => {
      if (error) {
        return res.status(400).json({
          error: "Could not update user purchase history",
        });
      }
      next();
    }
  );
};

exports.addOrderToUserGallery = (req, res, next) => {
  let gallery = [];
  console.log("Body", req.body)
  gallery.push({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price
    });
  

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { gallery: gallery } },
    { new: true },
    (error, result) => {
      if (error) {
        return res.status(400).json({
          error: "Could not update user purchase history",
        });
      }
      next();
    }
  );
};

exports.photo = (req, res, next) => {
  if (req.user.photo.data) {
    res.set("Content-Type", req.user.photo.contentType);
    return res.send(req.user.photo.data);
  }
  next();
};
