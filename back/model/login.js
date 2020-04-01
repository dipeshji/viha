const util = require('../util');
const userModel = require('../model/registeruser')
const adminModel = require('../model/registeruser')

async function Login_user(userbody) {
    let hash = await get_hash(userbody)
    
    if (hash) {
        var status = await util.decryptpass(userbody.password, hash.Password)
        return new Promise((resolve, reject) => {
            if (status) {
                resolve(hash)
            } else {
                reject({
                    "msg": "Incorrect Credentials!!",
                    "status": false
                })
            }
        })
    } else {
        return new Promise((resolve, reject) => {
            reject({
                "msg": `${userbody.id} dosent exists`,
                "status": false
            })
        })
    }
};

module.exports.get_user = (user) => {
    if(user === "admin@gmail.com"){
        return adminModel.adminModel.findOne({ User_id: user }).exec();

    }else{
    return userModel.userModel.findOne({ Email: user }).exec();

    }
}

module.exports.searcheduser = (user) => {
    return userModel.userModel.findOne({ Name: user.name }).exec();
}

var filter;
var update;
async function addasfriend(reqsentbyuser, reqsenttouser) {
    await userModel.userModel.findOne({ Email: reqsentbyuser }).exec().then(user => {
        filter = { Email: reqsenttouser };
        notification = [`Got a request from ${user.Name}`, `${user.Email}`]
        update = { Notification: notification };
    });
    return userModel.userModel.findOneAndUpdate(filter, update).exec();
}

module.exports.getadduserdata = (user) => {
    return userModel.userModel.findOne({ Name: user }).exec();
}

module.exports.confirm = ((sentbyuser, senttouser) => {
    if (sentbyuser === null) {
        return new Promise((resolve, reject) => {
            userModel.userModel.findOneAndUpdate({ Email: senttouser }, { Notification: [null, null] })
                .exec((err, user) => {
                    if (err) {
                        reject({ "status": false })
                    } else {
                        resolve({ "status": true })
                    }
                })
        })
    } else {
        return new Promise((resolve, reject) => {
            userModel.userModel.findOne({ Email: senttouser })
                .exec((err, user) => {
                    if (err) {
                        reject({ "status": false })
                    } else {
                        userModel.userModel.findOneAndUpdate({ Email: sentbyuser }, { Notification: [`${user.Name} has accepted your request`, "accepted"], Status: "Friends" })
                            .exec((err, user) => {
                                if (err) {
                                    reject({ "status": false })
                                } else {
                                    userModel.userModel.findOneAndUpdate({ Email: senttouser }, { Notification: ['', ''], Status: "Friends" })
                                        .exec((err, user) => {
                                            if (err) {
                                                reject({ "status": false })
                                            } else {
                                                resolve({ "Status": true })
                                            }
                                        })

                                }
                            })
                    }
                })
        })
    }
})


get_hash = (userbody => {
    if (userbody.id === "admin@gmail.com") {
        return adminModel.adminModel.findOne({ User_id: userbody.id })
            .exec()
    } else {
        return userModel.userModel.findOne({ Email: userbody.id })
            .exec()
    }
});

module.exports.Login_user = Login_user;
module.exports.addasfriend = addasfriend;

