// This is the Web Server
const express = require('express');
const server = express();
const cors = require("cors");

// create logs for everything
const morgan = require('morgan');
server.use(morgan('dev'));

// handle application/json requests
const bodyParser = require('body-parser');

server.use(bodyParser.json());
server.use(cors());

// here's our static files
const path = require('path');
server.use(express.static(path.join(__dirname, 'build')));

// here's our API
server.use('/api', require('./server/routes'));

// by default serve up the react app if we don't recognize the route
server.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

// bring in the DB connection
const db = require('./server/models');
db.sequelize.sync();
// connect to the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
    console.log(`Server is running on ${ PORT }!`);
});