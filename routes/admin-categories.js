const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

/*
  Get caregory models
*/

const Category = require('../models/category');

/*
  Get index
*/

router.get('/', (req, res) => {
  Category.find((err, categories) => {
    if (err) return console.log(err);

    res.render('admin/categories', {
      title: 'Admin categories',
      categories: categories
    });
  });
});

module.exports = router;