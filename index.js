var express = require('express')
var app = express();
var request = require("request")
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

app.get('/userInfo', function (req, res)
{
    res.render('bills.html');
});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})



app.post("/userInfo", function(req, res) {
	console.log('submit');
	console.log(req.body)
	var zip = req.body.zipinput
	var url = 'http://whoismyrepresentative.com/getall_mems.php?output=json&zip=' + zip
	var issues = req.body.issuesjson.split(',');
	console.log(issues)
	request({
	    url: url,
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	        console.log(body) // Print the json response
	        console.log(body['results'][0]['name'])
	        res.render('bills.html', {representative: body['results'][0]['name']})
	    }
	    else{

			res.render('bills.html', {representative: 'no representative data'})
	    }
	})


});













