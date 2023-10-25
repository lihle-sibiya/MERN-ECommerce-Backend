const express = require("express");
const router = express.Router();
const {
  create,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getRelatedProducts,
  productPhoto,
  getProductsByCategory,
} = require("../controllers/product");
const { requireLogin, isAdmin } = require("../middleware/auth");

router.post(
  "/create",
  requireLogin,
  isAdmin,
  // validateProduct,
  // validationErrors,
  create
);
router.get("/related/:productId", getRelatedProducts);
router.get("/photo/:productId", productPhoto);
router.get("/category/:categoryTitle", getProductsByCategory);
router.get("/:productId", getProduct);
router.get("/", getProducts);
router.put("/:productId/:userId", requireLogin, isAdmin, updateProduct);
router.delete("/:productId/:userId", requireLogin, isAdmin, deleteProduct);

module.exports = router;
