const express = require('express');
const path = require('path');
const ejs = require('ejs');

require('dotenv').config();

const {
  PORT
} = process.env;

console.log(`port is ${PORT}`);

// Init app
const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', ejs);

//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

//Start the server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});