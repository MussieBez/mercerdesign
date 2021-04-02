const { Favorites, FavoriteItem } = require("../models/favorites");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.favoriteById = (req, res, next, id) => {
  FavoriteItem.findById(id)
    .populate("products.product", "name")
    .exec((err, favorite) => {
      if (err || !favorite) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      req.favorite = favorite;
      next();
    });
};

exports.create = (req, res) => {
  console.log("Favorite: ", req.body);
  console.log("Favorite req: ", req.body.favorite);
  console.log("Profile: ", req.profile);

  req.body.user = req.profile;
  const favorite = new FavoriteItem(req.body);
  console.log("NewFavorite: ", req.body);
  favorite.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json(data);
  });
};

exports.listFavorites = (req, res) => {
  FavoriteItem.find()
    .populate("user", "_id name")
    .sort("-created")
    .exec((err, favorites) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(favorites);
    });
};

exports.remove = (req, res) => {
  let productId = req.params.productId;
  console.log("Request", req.params.productId)
  FavoriteItem.findById({_id:productId})
  .then((favorites) => favorites.remove())
  .then((favorites) => res.json(favorites))
  .catch((err) => res.status(422).json(err))
  
};
