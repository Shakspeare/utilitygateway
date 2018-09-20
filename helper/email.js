var nodemailer = require('nodemailer');
var util = require('util');
var pkg = require('../package.json');
var template = require('./template.js')

var target = pkg.targets;
exports.send = function (data) {
    var fmail = '';
    var pwd = '';
    var tomail = '';
    var res='';

    target.forEach(element => {
        if (element.domain == data.domain) {

            fmail = element.fmail;
            tomail = element.tomail;
            pwd = element.password;
        }


    });

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: fmail,
            pass: pwd
        }
    });
    var mbody = util.format(template.contact, data.name, data.email, data.phone, data.message);

    var mailOptions = {
        from: fmail,
        to: tomail,
        subject: data.subject,
        html: mbody
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error.message);
            res=1;


        } else {
            
            res=0;




        }
    });
    return res;
 
};