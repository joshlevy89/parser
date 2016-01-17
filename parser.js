var express = require('express');
var app = express();
var stylus = require('stylus');
var path = require('path');

// home page
app.use(stylus.middleware(path.join(__dirname,'/public/css')));
app.use(express.static('public'));

// response content
app.set('view engine', 'jade')
app.set('views', path.join(__dirname, '/public'));

app.get('/whoami', function(req,res) {
  var ip = req.headers['x-forwarded-for'];
  var language = req.headers['accept-language'].substring(0,5);
  var op = req.headers['user-agent'].substring(13,46);
  var o = {
    ip:ip,
    language:language,
    software:op
  }
     res.render('response',{info:JSON.stringify(o)});
});

app.listen(process.env.PORT);