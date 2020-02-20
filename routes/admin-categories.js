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

/*
  Get add a category
*/

router.get('/add-category', (req, res) => {
  res.render('admin/add-category', {
    title: 'Add a category'
  });
});

/*
  Post add a category
*/

router.post('/add-category', [
  check('title').isLength({ min: 3 }),
], (req, res) => {
  const errorsList = validationResult(req);

  const title = req.body.title;
  let slug = title.replace(/\s+/g, '-').toLowerCase();

  if (slug == "") {
    slug = title.replace(/\s+/g, '-').toLowerCase();
  }

  if (!errorsList.isEmpty()) {
    res.render('admin/add-category', {
      errors: errorsList.errors,
      title: title,
    });
  } else {
    Category.findOne({ slug: slug }, (err, category) => {
      if (category) {
        req.flash('danger', 'Category title exists, please choose another.');

        res.render('admin/add-category', {
          title: title,
        });
      } else {
        const category = new Category({
          title: title,
          slug: slug,
        });

        category.save((err) => {
          if (err) return console.log(err);

          req.flash('success', 'Category is added');
          res.redirect('/admin/categories');
        });
      }
    });
  }
});

module.exports = router;