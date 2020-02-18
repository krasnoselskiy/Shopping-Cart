const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

/*
  Get index
*/

router.get('/', (req, res) => {
  res.render('admin', {
    title: 'Admin panel'
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
  check('title').isLength({ min: 5 }),
  check('content').isLength({ min: 5 })
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
    })
  } else {
    res.send("All is okey")
  }
});

/*
  All pages
*/

router.get('/pages', (req, res) => {
  res.render('admin/pages', {
    title: 'All pages'
  });
});

module.exports = router;
