const { check, validationResult } = require("express-validator");

exports.validateRegister = [
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Email must be valid"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
];

exports.validateLogin = [
  [
    check("email").isEmail().withMessage("Email must be valid"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
];

exports.validationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};