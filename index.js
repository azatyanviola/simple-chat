
global.Promise = require('bluebird');
const env = require('dotenv').config();

const PORT = process.env.PORT || 3000;



const express = require('express');
const app = express();
const http = require('http');
const nunjucks = require('nunjucks');
const server = http.createServer(app);
const io = require('socket.io')(server, { serveClient: true });
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const config = require('./server/config');

const passport = require('passport');
const { Strategy } = require('passport-jwt');

const { jwt } = require('./server/config');

passport.use(
  new Strategy(jwt, function(jwt_payload, done) {
    if (jwt_payload != void 0) {
      return done(false, jwt_payload);
    }
    done();
  })
);

// mongoose.connect(config.mongo.url, config.mongo.options);
// mongoose.set("debug", process.env.NODE_ENV !== "production");
// mongoose.connection.on("error", e => {
//   console.error("MongoDB connection error", e);
//   process.exit(0);
// });

const url = 'mongodb+srv://Avioleta:q2LFzHOnql0hSd7M@node-chat.lmbptbi.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(url, {useNewUrlParser: true});

nunjucks.configure('./client/views', {
  autoescape: true,
  express: app
});

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

app.use(cookieParser());

require('./server/router')(app);

require('./server/sockets')(io);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});