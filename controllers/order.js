const { CartItem, Order } = require("../models/order");
const User = require("../models/user");

exports.createOrder = async (req, res) => {
  console.log(req.user);
  try {
    const user = await User.findById(req.user._id).select("-password -__v");
    req.body.order.user = user;
    const order = new Order(req.body.order);
    await order.save();
    res.json(order);
  } catch (err) {
    console.log(err);
  }
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("user", "_id name email address")
    .sort("-created");
  if (!orders) {
    return res.status(400).json({ error: "Order not found" });
  }
  res.json(orders);
};

exports.getStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = async (req, res) => {
  try {
    let order = await Order.findById(req.params.orderId).populate(
      "products.product",
      "title price"
    );
    let updatedOrder = await Order.updateOne(
      { _id: order._id },
      { $set: { status: req.body.status } }
    );
    res.json(updatedOrder);
  } catch (err) {
    console.log(err);
  }
};
