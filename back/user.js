const express = require('express');
const cors = require('cors');
const body_parser = require('body-parser');
const mongoose = require('mongoose');

const port = 3000

var app = express();
// app.use('/foo', express.static(__dirname + '/public'));
app.use('/uploads', express.static(__dirname + './../uploads/'));

// usemidd = [cors,body_parser]
app.use(cors());
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

const dburl = 'mongodb://localhost:27017/test_db'
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useFindAndModify', false);

mongoose.connection.on('connected', () => {
    console.log(`database connection to ${dburl} succesfull`);

})

var register_users = require('./route/registeruser');
var login_user = require('./route/login');
var admin_feedback = require('./route/feedback');

app.use('/register', register_users);
app.use('/login', login_user);
app.use('/feed', admin_feedback);

app.listen(port, () => {
    console.log(`server running on localhost:${port}`);

})

