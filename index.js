// main starting point of app
// npm install --save express mongoose morgan body-parser
// npm install --save bcrypt-nodejs
// npm install --save jwt-simple
// npm install --save passport passport-jwt
// npm install --save passport-local
// npm install --save cors


// node index.js to start

// npm install --save nodemon
// npm run dev // to use nodemon after adding dev to scripts in package.json

// to run mongo: C:\Program Files\MongoDB\Server\3.6\bin>mongod.exe --dbpath e:\data


const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan'); // logging
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// DB Setup
mongoose.connect('mongodb://localhost:27017/auth');

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));  // parse all requests into json
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
