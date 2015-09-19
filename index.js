var express = require('express')
var app = express();
var sendgrid  = require('sendgrid')('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');

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


app.get('/', function (req, res)
{
    res.render('index.html');
});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

















