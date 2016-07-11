"use strict";

require('dotenv').load();
const PORT 			= process.env.PORT || 8000;
const MONGO_URL = process.env.MONGODB_URI || 'mongodb://localhost/giphTwitter';
const uuid      = require('uuid');
const express 	= require('express');
const router 		= express.Router();
const morgan 		= require('morgan');
const app 			= express();
const server 		= require('http').Server(app);
const mongoose 	= require('mongoose');
const bodyParser = require('body-parser');
const io = require('socket.io')(server);
require('./server/socket').getIO(io);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(morgan('dev'));
app.use('/api', require('./routes/api'));
app.get('/uuid', (req, res)=>{
  res.send(uuid());
});
app.get('/',(req,res) =>res.render('index'));
app.use((req, res, next) => {
  res.handle = (err, dbData) => res.status(err ? 400 : 200).send(err || dbData);
  next();
});

server.listen(PORT, err => console.log(err || `Server @ PORT ${PORT}`));
mongoose.connect(MONGO_URL, err => console.log(err|| `MongoDB @ ${MONGO_URL}`));

module.exports = app;
