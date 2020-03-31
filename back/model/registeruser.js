const mongoose = require('mongoose');
var schema = mongoose.Schema;
const utils = require('../util')
var moment = require('moment')

var user_schema = new schema({
    Name: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    DOB: {
        type: String,
        required: true
    },
    Mobile_Number: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    }, Notification: {
        type: Array,
        default: null
    }, Status: {
        type: String,
        default: null
    },
    Profile_img: {
        type: String
    }
});

var admin_schema = new schema({
    User_id: {
        type: String
    },
    password: {
        type: String
    },
    Feedbacks: [{
        name: {
            type: String,
            default: null
        },
        feedbackmsg: {
            type: String,
            default: null
        }
    }]
});

const userModel = module.exports = mongoose.model('User', user_schema);
const adminModel = module.exports = mongoose.model('Admin', admin_schema)

module.exports.register_user = ((userbody, img) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({ Email: userbody.email })
            .exec((err, user) => {
                if (user) {
                    if (user.Name === userbody.name) {
                        reject({
                            "status": false,
                            "msg": `User with ${userbody.email} and ${userbody.name} already exist!!`
                        })
                    } else {
                        reject({
                            "status": false,
                            "msg": `User with ${userbody.email} already exist!!`
                        })
                    }
                } else {
                    if (userbody.email === "admin@gmail.com") {
                        utils.encryptpass(userbody.password)
                            .then(hash => {
                                let adminuser = {
                                    User_id: userbody.email,
                                    password: hash
                                }

                                adminModel.create(adminuser, (err, user) => {
                                    if (user) {
                                        resolve({
                                            status: true,
                                            "msg": `User with user name ${user.User_id} successfuly registered`,
                                            "user": user
                                        })
                                    } else {
                                        reject({
                                            "status": false,
                                            "msg": "Error occured"
                                        })
                                    }
                                })
                            })
                    } else {
                        utils.encryptpass(userbody.password)
                            .then(hash => {
                                let inuser = {
                                    Name: userbody.name,
                                    Password: hash,
                                    DOB: isoDate(userbody.dob),
                                    Mobile_Number: userbody.mobile_number,
                                    Email: userbody.email,
                                    Notification: null,
                                    Status: userbody.status,
                                    Profile_img: img.filename
                                }

                                userModel.create(inuser, (err, ruser) => {
                                    if (ruser) {
                                        resolve({
                                            status: true,
                                            "msg": `User with user name ${ruser.Name} successfuly registered`,
                                            "user": ruser
                                        })
                                    } else {
                                        reject({
                                            "status": false,
                                            "msg": "Error occured"
                                        })
                                    }
                                })
                            })
                    }
                }
            })
    })
})


function isoDate(date) {
    if (!date) {
        return null
    }
    date = moment(date).toDate()

    var month = 1 + date.getMonth()
    if (month < 10) {
        month = '0' + month
    }
    var day = date.getDate()
    if (day < 10) {
        day = '0' + day
    }
    return day + '-' + month + '-' + date.getFullYear()
}
