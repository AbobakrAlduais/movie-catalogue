const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');

const db = require('./server/config/database');
const users = require('./server/routes/users');
const movies = require('./server/routes/movies');
const app = express();


// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// connect to mongoose
mongoose.Promise = global.Promise;
mongoose.connect(db.mongoURI)
  .then(() =>  {console.log('MongoDB connected..');})
  .catch((err) => {console.log(err);});


//Use  Routs
app.use('/users', users);
app.use('/movies', movies);

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
