const express = require('express');
const router = express.Router();
var feed_submit = require('../model/feedback')


router.post('/feedback', (req,res)=>{
    let user = req.body.name;
    let msg = req.body.formfeed;
    
    feed_submit.submit_Feedback(msg,user).then(user=>{
        res.json({"status": true, "msg": "Feedback submitted successfuly"})
    }).catch(err=>{
        res.json({"status":false, "msg": "Error occured!! please try again"})
    })
})

router.get('/feedbacks',(req,res)=>{
    feed_submit.feedbacks().then(user=>{
        if(user.Feedbacks){
            res.json({"status": true, "feedbacks": user.Feedbacks})
        }else{
            res.json({"status": false, "feedbacks": "No feedbacks"})

        }
    })
})

module.exports = router;