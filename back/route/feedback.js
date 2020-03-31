const express = require('express');
const router = express.Router();
var feed_submit = require('../model/feedback')


router.post('/feedback', (req,res)=>{
    let user = req.body.name;
    let msg = req.body.feedback;
    feed_submit.submit_Feedback(msg,user).then(user=>{
        res.json({"status": true, "msg": "Feedback submitted successfuly"})
    }).catch(err=>{
        res.json({"status":false, "msg": "Error occured!! please try again"})
    })
})

module.exports = router;