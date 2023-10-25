const express = require("express");
const router = express.Router();
const { getUser, updateUser, deleteUser } = require("../controllers/user");
const { requireLogin } = require("../middleware/auth");

router.get("/:userId", getUser);
router.put("/:userId", requireLogin, updateUser);
router.delete("/:userId", requireLogin, deleteUser);

module.exports = router;

