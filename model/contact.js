var mongoose=require('mongoose')
module.exports = mongoose.model('Contact',{
    domain: String,
    name:String,
    phone:String,
    email:String,
    subject:String,
    message:String
});
