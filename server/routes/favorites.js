const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById, addOrderToUserFavorites } = require("../controllers/user");
const {
  create,
  listFavorites,
  favoriteById,
  remove
} = require("../controllers/favorites");


router.post(
  "/favorite/create/:userId",
  requireSignin,
  isAuth,
  addOrderToUserFavorites,
  create
);

router.delete(
  "/favorite/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);

router.get("/favorite/list/:userId", requireSignin, isAuth, isAdmin, listFavorites);
// router.get(
//   "/order/status-values/:userId",
//   requireSignin,
//   isAuth,
//   isAdmin,
//   getStatusValues
// );
// router.put(
//   "/order/:orderId/status/:userId",
//   requireSignin,
//   isAuth,
//   isAdmin,
//   updateOrderStatus
// );

router.param("userId", userById);
router.param("favoriteById", favoriteById);

module.exports = router;
