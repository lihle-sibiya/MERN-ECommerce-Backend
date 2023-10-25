const User = require("../models/user");

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

// Update user
exports.updateUser = async (req, res) => {
  // Check authorization
  if (req.params.userId !== req.user._id) {
    return res.status(403).json({ error: "Access Denied" });
  }

  try {
    // find email in db
    let check = await User.findOne({ email: req.body.email });
    // find user by params id
    let currentUser = await User.findById(req.params.userId);

    // if logged in user email = body or email in db = body
    if (currentUser.email !== req.body.email || check._id === req.body.email) {
      return res.status(400).json({ message: "Email already exists" });
    }

    await User.findOneAndUpdate(req.params.userId, req.body, {
      new: true,
    }).select("-password -__v");
    return res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  // Check authorization
  if (req.params.userId !== req.user._id) {
    return res.status(403).json({ message: "Access Denied" });
  }
  try {
    await User.findOneAndDelete(req.params.userId);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

exports.addOrderToHistory = async (req, res, next) => {
  let history = [];

  req.body.order.products.forEach((product) => {
    history.push({
      _id: product._id,
      title: product.title,
      description: product.description,
      category: product.category,
      quantity: product.count,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount,
    });
  });
  await User.findByIdAndUpdate(
    { _id: req.user._id },
    { $push: { history } },
    { new: true }
  );
  next();
};
