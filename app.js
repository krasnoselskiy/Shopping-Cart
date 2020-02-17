const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

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

// Set global errors variable
app.locals.errors = null;

// Body parser middleware
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Set session middleware
app.set('trust proxy', 1);
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

// Set messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Set routes
const pages = require('./routes/pages');
const adminPages = require('./routes/admin');

app.use('/', pages);
app.use('/admin/', adminPages);

//Start the server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});