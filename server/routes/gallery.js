const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById, addOrderToUserGallery } = require("../controllers/user");
const {
  create,
  photoById,
  read,
  photo,
  remove,
  galleryList
} = require("../controllers/gallery");


router.post(
  "/gallery/create/:userId",
  requireSignin,
  isAuth,
  create
);

router.delete(
  "/gallery/:photoId/:userId",
  requireSignin,
  isAuth,
  remove
);

router.get("/gallery/:userId", requireSignin, isAuth, galleryList);
router.get("/gallery/photo/:photoId", photo);

router.param("userId", userById);
router.param("photoById", photoById);

module.exports = router;
