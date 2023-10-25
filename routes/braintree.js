const express = require("express");
const router = express.Router();
const { requireLogin } = require("../middleware/auth");
const {
  generateBraintreeToken,
  makePayment,
} = require("../controllers/braintree");

router.get("/gettoken", requireLogin, generateBraintreeToken);
router.post("/payment", requireLogin, makePayment);

module.exports = router;
