const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

/*
  Get pages models
*/

const Page = require('../models/page');

/*
  Get index
*/

router.get('/', (req, res) => {
  res.render('admin', {
    title: 'Admin panel',
  });
});

/*
  Get add page
*/

router.get('/add-page', (req, res) => {
  let title = 'Add a new page';
  let slug = '';
  let content = '';

  res.render('admin/add-page', {
    title: title,
    slug: slug,
    content: content
  });
});

/*
  Post add page
*/

router.post('/add-page', [
  check('title').isLength({ min: 3 }),
], (req, res) => {
  const errorsList = validationResult(req);

  const title = req.body.title
  const content = req.body.content
  let slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();

  if (slug == "") {
    slug = title.replace(/\s+/g, '-').toLowerCase();
  }

  if (!errorsList.isEmpty()) {
    res.render('admin/add-page', {
      errors: errorsList.errors,
      title: title,
      slug: slug,
      content: content
    });
  } else {
    Page.findOne({ slug: slug }, (err, page) => {
      if (page) {
        req.flash('danger', 'Page slug exists, please choose another.');

        res.render('admin/add-page', {
          title: title,
          slug: slug,
          content: content
        });
      } else {
        const page = new Page({
          title: title,
          slug: slug,
          content: content,
          sorting: 100
        });

        page.save((err) => {
          if (err) return console.log(err);

          req.flash('success', 'Page is added.');
          res.redirect('/admin/pages');
        });
      }
    });
  }
});

/*
Post reorder page
*/

router.post('/pages/reorder-page', (req, res) => {
  const ids = req.body.id;
  var count = 0;

  for (let i = 0; i < ids.length; i++) {
    let id = ids[i];
    count++;

    (function (count) {
      Page.findById(id, function (err, page) {
        page.sorting = count;
        page.save((err) => {
          if (err) return console.log(err);
        });
      });
    })(count)
  }
});

/*
  All pages
*/

router.get('/pages', (req, res) => {
  Page.find({}).sort({ sorting: 1 }).exec((err, pages) => {
    res.render('admin/pages', {
      title: 'All pages',
      pages: pages
    });
  });
});

module.exports = router;
