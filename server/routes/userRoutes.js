import express from "express";
import {
  allProducts,
  productByCategory,
  productById,
} from "../controllers/user/userProductController.js";
import tryCatch from "../utils/tryCatch.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  getUserCart,
  removeFromCart,
  updateCart,
} from "../controllers/user/userCartController.js";
import {
  addToWishList,
  getUserWishList,
  removeFromWishList,
} from "../controllers/user/userWishListController.js";
import {
  cancelOneOrder,
  getAllOrders,
  getOneOrder,
  orderCashOnDel,
} from "../controllers/user/userOrderController.js";

const router = express.Router();

router
  // routes for the products to show, doesn't need any verification
  .get("/products", tryCatch(allProducts)) // getting all the products
  .get("/products/:id", tryCatch(productById)) // getting a product by id
  .get("/products/category/:category", tryCatch(productByCategory)) // getting products by category

  //routes for cart handling
  .get("/cart", verifyToken, tryCatch(getUserCart)) // getting user's cart
  .post("/cart", verifyToken, tryCatch(updateCart)) // updating the products in the cart
  .delete("/cart", verifyToken, tryCatch(removeFromCart)) // removing a product from the cart

  // routes for wishlist handling
  .get("/wishList", verifyToken, tryCatch(getUserWishList)) // getting user's wish list
  .post("/wishList", verifyToken, tryCatch(addToWishList)) // adding item to wish list
  .delete("/wishList", verifyToken, tryCatch(removeFromWishList)) // removing item from wish list

  // routes for orders
  .get("/orders", verifyToken, tryCatch(getAllOrders)) // getting all orders by user
  .get("/orders/:orderId", verifyToken, tryCatch(getOneOrder)) // getting order by id
  .post("/orders/cod", verifyToken, tryCatch(orderCashOnDel)) // making an order by cash on delivery
  .patch("/orders/cancel/:orderId", verifyToken, tryCatch(cancelOneOrder)); // cancelling an order by id

export default router;
