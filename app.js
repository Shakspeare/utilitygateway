var app = require('express')();
var http = require('http').Server(app);
var cors = require('cors')
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var util = require('util');
var arraySort = require('array-sort');

var pkg = require('./package.json');
var template = require('./helper/template.js')
var constant =require('./helper/constant.js')

var target = pkg.targets;
app.use(cors())
app.use(bodyParser.json())


  
 
app.get('/test', function (req, res) {
    res.send({ name: 'test', email: 'test@gmail.com', phone: '9791135458', subject: 'my first mail', message: 'hello word', domain: 'test' })
});
app.get('/api/event', function (req, res) {
    var lst=constant.events;
    var d=new Date();
    
    d.setDate(d.getDate()-90);
    
    var filtered = lst.filter(item=>{
        var time = new Date(item.datetime).getTime();
        return time>d.getTime()
    });

    var lst=arraySort(filtered, 'datetime', {reverse: true});
    res.send(lst);
});
app.get('/api/event/upcoming', function (req, res) {
    var lst=constant.events;
    var d=new Date();
    
    
    var filtered = lst.filter(item=>{
        var time = new Date(item.datetime).getTime();
        return time>d.getTime()
    });
   var lts= arraySort(filtered, 'datetime');
    res.send(lts);
});
app.get('/api/event/upcoming/next', function (req, res) {
    var lst=constant.events;
    var d=new Date();
    
    
    var filtered = lst.filter(item=>{
        var time = new Date(item.datetime).getTime();
        return time>d.getTime()
    });
    var lts= arraySort(filtered, 'datetime');
    res.send(lts[0]);
});
app.post('/mail/contact/send', function (req, res) {
    var fmail = '';
    var pwd = '';
    var tomail = '';
    var data = req.body;
    target.forEach(element => {
        if (element.domain == data.domain) {

            fmail = element.fmail;
            tomail = element.tomail;
            pwd = element.password;
        }


    });

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        auth: {
            user: fmail,
            pass: pwd
        },
        secure: true
    });
    var mbody = util.format(template.contact, data.name, data.email, data.phone, data.message);
    var subject = data.subject;
    if (subject == undefined || subject == '') {
        subject = 'New enquiry';
    }

    
    var mailOptions = {
        from: fmail,
        to: tomail,
        subject: subject,
        html: mbody
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error.message);
            res.status(500).send('Error while sending email, please contact administrator');
        } else {
            res.status(200).send('Email sent successfully!');
        }
    });

});
app.post('/mail/prayerrequest/send', function (req, res) {
    var fmail = '';
    var pwd = '';
    var tomail = '';
    var data = req.body;
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
    var mbody = util.format(template.prayerRequest, data.name, data.email, data.phone, data.message);

    var mailOptions = {
        from: fmail,
        to: tomail,
        subject: data.subject,
        html: mbody
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error.message);
            res.status(500).send('Error while sending email, please contact administrator');
        } else {
            res.status(200).send('Email sent successfully!');
        }
    });

});
http.listen(8080, function () {
    console.log('listening on *:8080');
});
