var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');


app.post('././mail/contact.js', function(req, res) {
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
            res.render('index', {msg: 'Error occured, sorry message not sent', err: true, page: 'index'})
        }
        else {
            res.render('index', {msg: 'Message sent, thank you!', err: false, page: 'index'})
        }
        });
    });