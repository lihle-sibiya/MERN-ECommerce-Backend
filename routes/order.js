const express = require("express");
const router = express.Router();

const { requireLogin, isAdmin } = require("../middleware/auth");
const {
  createOrder,
  getOrders,
  getStatus,
  updateStatus,
} = require("../controllers/order");
const { addOrderToHistory } = require("../controllers/user");
const { updateStock } = require("../controllers/product");

router.post("/", requireLogin, addOrderToHistory, updateStock, createOrder);
router.get("/", requireLogin, isAdmin, getOrders);
router.get("/status", requireLogin, isAdmin, getStatus);
router.put("/:orderId/status", requireLogin, isAdmin, updateStatus);
module.exports = router;
