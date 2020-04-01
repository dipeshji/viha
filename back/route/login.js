const express = require('express')
const router = express.Router()
var loginuser = require('../model/login')
var jwt = require('jsonwebtoken');


router.get('/loginuser', (req, res) => {
    let params = { password: req.query.pass, id: req.query.id }
    if (params.id !== 'undefined' && params.password !== 'undefined') {
        loginuser.Login_user(params)
            .then(user => {
                if(user.Email === undefined){
                    let token = jwt.sign({ user: user.User_id }, 'secret')
                    res.status(200).json({ "token": token, "status": true, "User_id": user.User_id })
                }else{
                    let token = jwt.sign({ user: user.Email }, 'secret')
                    res.status(200).json({ "token": token, "status": true, "User_id": user.User_id })
                }
               
            }).catch(msg => {
                res.json(msg)
            })
    }else{
        res.json({"status": false, msg:"Invalid Cradentials!!"});
    }

})

router.get('/authenticate', verifytoken, (req, res) => {
    loginuser.get_user(decodedtoken.user).then(user =>{
        res.status(200).json({ "status": true, "user": user})
    })
})

router.post('/searcheduser', (req,res)=>{
    loginuser.searcheduser(req.body).then(user => {
        if(user !== null){
        res.json({"status": true, "user": user})
        }else{
            res.json({"status": false, "msg": "No user matched!!"})
        }
    }).catch(err =>{
        res.json({"status":false, "msg": "No user found!!"})
    })
})

router.get('/addasfriend',verifytoken,(req,res) => {
    let reqsentbyuser = decodedtoken.user;
    let reqsenttouser = req.query.user;
    loginuser.addasfriend(reqsentbyuser, reqsenttouser).then(user =>{
        res.json({"status": true, "msg" : `Request sent to ${user.Name}`});
    }).catch(err=>{
        res.json({"status":false, "msg": "An error occured!!"});
    })
})

router.get('/getadduser', (req,res)=>{
    loginuser.getadduserdata(req.query.user).then(user =>{
        res.json({"status": true, "user": user})
    })
})

router.get('/confirm', (req,res)=>{
    let senttouser = req.query.senttouser;
    let sentbyuser = req.query.sentbyuser;
    
    loginuser.confirm(sentbyuser,senttouser).then(status=>{
        res.json(status);
    })
})

var decodedtoken = '';

function verifytoken(req, res, next) {
    let token = req.query.token;  
    jwt.verify(token, 'secret', (err, tokendata) => {
        if (err) {
            res.json({ "status": false });
        } else {
            decodedtoken = tokendata;
            next();
        }
    })
}

module.exports = router