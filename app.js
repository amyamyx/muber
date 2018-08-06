const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose') ;
const routes = require('./routes/routes');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/muber', { useNewUrlParser: true });

// place app.user right before routes(app)
app.use(bodyParser.json());
routes(app);

module.exports = app;