const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');

require('dotenv').config();

const {
  PORT,
  DB_PORT,
  DB_NAME
} = process.env;

// Connect to db
mongoose.connect(`mongodb://localhost:${DB_PORT}/${DB_NAME}`,
  { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => {
      console.log('Connected to db');
    },
    err => {
      console.log('Cant connect to db');
    }
  );

// Init app
const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home'
  });
});

//Start the server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});