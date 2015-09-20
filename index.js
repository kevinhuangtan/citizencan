var express = require('express')
var app = express();
var request = require("request")

var final_bills =[]

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

var execPhp = require('exec-php');



app.get('/', function (req, res)
{
    res.render('index.html');
});

app.get('/bills', function (req, res)
{
	console.log('hey')
	var url = 'https://api.fiscalnote.com/legislators?apikey=0PF9LT40SUWYR5MR&legislature=US&view=full&q=' + 

	// execPhp('crawlgov.php', '/usr/bin/php', function(error, php, output){
	// 	if(error){
	// 		console.log(error)
	// 	}
	// 	console.log('here')
	//     // php now contain user defined php functions.
	//     php.my_own_php_function(arg1, arg2, function(error, result, output, printed){
	//         // `result` is return value of `my_own_php_function` php function.
	//         console.log('output')
	        
	//     });
	// });

    res.render('bills.html');
});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})


app.get('/finalbills', function(req, res){
	res.render('finalbills.html', {finalbills: final_bills})
});

app.post("/userInfo", function(req, res) {

	var zip = req.body.zipinput
	var url = 'http://whoismyrepresentative.com/getall_mems.php?output=json&zip=' + zip
	var issues = req.body.issuesjson.split(',');

	request({
	    url: url,
	    json: true
	}, function (error, response, body) {
	    if (!error && response.statusCode === 200) { 
	        var name = body['results'][0]['name'].split(' ').join('+');
	        var name_url = 'https://api.fiscalnote.com/legislators?apikey=0PF9LT40SUWYR5MR&legislature=US&view=full&q=' + name
	        request({
	        	url: name_url,
	        	json: true
	        }, function (error, response, body){
	        	if(!error && response.statusCode === 200){
	        		var roles = body[0]['roles'];

	        		var re = /(USC003679|USC003951|USC003784|USC003653|USC003762|USC003646|USC003844|USC003918|USC003910|USC003883|USC003472|USC003645|USC003398|USC004046|USC004001|USC003659|USC003688|USC003610|USC003897|USC003318|USC002703|USC002656|USC003649|USC003931|USC002875|USC002887|USC003616|USC003626|USC002777|USC004015|USC003415|USC003879|USC003733|USC003632|USC004036|USC002654|USC002906)/;

	        		var committees = []
	        		for ( var i = 0; i < roles.length; i++){
	        			if(roles[i]["committee_id"] != undefined){
		        			var found = roles[i]['committee_id'].match(re);
		        			if(found != null){
		        				committees.push(found[0])
		        			}
	        			}
	        		}
	        		for (var t = 0; t < issues.length; t++){
	        			for(var c = 0; c < committees.length; c++){
			        		var url_topic = 'https://api.fiscalnote.com/bills?apikey=0PF9LT40SUWYR5MR&view=full&legislature=US&status=engrossed&q=' + issues[t] + '&committee=' + committees[c]
					        request({
					        	url: url_topic,
					        	json: true
					        }, function (error, response, body){
					        	if(!error && response.statusCode === 200){
					        		console.log(body)
					        		final_bills.push(body)
					        	}
					        	else{
					        		console.log('error johnny')
					        	}
					        })
	        			}
	        		}
	        		// console.log(final_bills)
	        		res.render('bills.html')

	        	}
	        	else{
	        		console.log('error here')
	        	}
	        })
	        res.render('bills.html', {representative: body['results'][0]['name']})
	    }
	    else{
	    	console.log('error there')
			res.render('bills.html', {representative: 'no representative data'})
	    }
	})
});













