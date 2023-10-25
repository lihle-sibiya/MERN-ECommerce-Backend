const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user && user.name.toLowerCase() === name.toLowerCase()) {
      return res.status(400).json({ error: "This username already exists" });
    }
    if (user && user.email === email.toLowerCase()) {
      return res.status(400).json({ error: "This email already exists" });
    }

    const hashed_password = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashed_password });
    await user.save();

    return res.status(201).json({ message: "Account successfully created" });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong");
  }
};

exports.login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const { _id, name, email, role } = user;
    return res.status(200).json({ token, user: { _id, name, email, role } });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong");
  }
};