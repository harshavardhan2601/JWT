const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    indexRoute = require('./routes/index');
    session = require('express-session');
    jwt = require('jsonwebtoken');

mongoose.connect('mongodb://localhost:27017/ngjwtlogin', { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "500mb" })); // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true, limit: "500mb" })); // parse application/x-www-form-urlencoded
app.use(cors());

app.use(
  session({
    secret: 'key',
    resave: false,
    saveUninitialized: true

  })
);

app.use('/', indexRoute);
const port = process.env.PORT || 3000;

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});