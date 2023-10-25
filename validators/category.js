const { check, validationResult } = require("express-validator");

exports.validateCategory = [
  [check("title").notEmpty().withMessage("Title is required")],
];

exports.validationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
