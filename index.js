// main starting point of app
// npm install --save express mongoose morgan body-parser

// node index.js to start

// npm install --save nodemon
// npm run dev // to use nodemon after adding dev to scripts in package.json


const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan'); // logging
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// DB Setup
mongoose.connect('mongodb://localhost:auth/auth');

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));  // parse all requests into json
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
