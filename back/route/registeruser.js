const express = require('express');
const router = express.Router();
const registeruser = require('../model/registeruser');
const multer = require('multer');
var path = require('path');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.png') 
    }
})

const upload = multer({ storage: storage });

// upload.single('profileimg')
router.post('/registeruser' ,upload.single('profileimg'), (req, res) => {
    registeruser.register_user(req.body, req.file)
        .then((resbody) => {
            res.status(201).json(resbody)
        })
        .catch(resbody => {
            res.json(resbody)
        })
})

module.exports = router;