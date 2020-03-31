const adminModel = require('../model/registeruser');


module.exports.submit_Feedback = (feedback,user)=>{
    let feedback_to_insert = {name:user, feedbackmsg:feedback}
    return adminModel.updateOne({User_id: "admin@gmail.com"},{$push:{Feedbacks:feedback_to_insert}})
    .exec()
}