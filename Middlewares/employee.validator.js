const { body, validationResult } = require('express-validator');

const validateUpdate = [
  body('name').optional().notEmpty().withMessage('Name is required'),
  body('email').optional().notEmpty().withMessage('Email is required'),
  (req, res, next) => {
    next();
  }
];



module.exports = validateUpdate;