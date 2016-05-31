var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var app = express();

var port = process.env.PORT || 8080;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/endpoint', function(req, res) {
    var mailOpts, smtpTrans;
    
    
    smtpTrans = nodemailer.createTransport('SMTP', {
        service: 'Gmail',
        auth: {
            user: "happydropsrecords@gmail.com",
            pass: "SuperAltEi"
        }
        });
    
    mailOpts = {
        from: req.body.name + '&lt;' + req.body.email + '&gt;',
        to: 'happydropsrecords@gmail.com',
        subject: 'email from website',
        text: req.body.message
        };
    
    smtpTrans.sendMail(mailOpts, function (error, response) {
        if (error) {
            res.render('index', {msg: 'Error occured, sorry message not sent', err: true, page: 'index.js'})
        }
        else {
            res.render('index', {msg: 'Message sent, thank you!', err: false, page: 'index.js'})
        }
        });
    });


app.listen(port, function()  {
    console.log('Our app is running on http://localhost' + port);
});