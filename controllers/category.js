const Category = require("../models/category");

exports.create = async (req, res) => {
  try {
    let category = await Category.findOne({ title: req.body.title });
    if (category) {
      return res
        .status(400)
        .json({ error: `${req.body.title} already exists` });
    }
    category = new Category(req.body);
    await category.save();
    return res.status(201).json(category);
  } catch (err) {
    console.log(err);
  }
};

exports.getCategories = async (req, res) => {
  try {
    const category = await Category.find();
    if (!category) {
      return res.status(400).json({ error: "Categories not found" });
    }
    res.json(category);
  } catch (err) {
    console.log(err);
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(400).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    console.log(err);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    let category = await Category.findByIdAndUpdate(
      req.params.categoryId,
      req.body,
      {
        new: true,
      }
    );
    res.json(category);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    let category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(400).json({ error: "Category not found" });
    }
    await category.remove();
    res.json({ message: "Category successfully deleted" });
  } catch (err) {
    console.log(err);
  }
};
