
<?php

// require_once 'includes/global.inc.php';
require_once 'includes/classes/Gov_Crawler.php';


// set_time_limit(0);
// ini_set('memory_limit','512M');

$baseUrl = 'https://api.fiscalnote.com/legislators?apikey=0PF9LT40SUWYR5MR&legislature=US&view=full&q=';

$c = new Gov_Crawler();

        // $c->downloader();
        // $c->misdirectReseter();
        // $c->checkHtml();
        // die();




//$c->goGetIt('http://exchange.nagios.org/directory/Plugins/Operating-Systems/Linux');


//die();
echo 'hello';
$str = 'Frank Pallone';
$str1 = 'Frank Pallone';
$topics = array();
array_push($topics, 'abortion');

$str = preg_replace('[\s]', '+', $str);
$url = $baseUrl . $str;

$committees = $c->goGetIt($url);
foreach ($committees as $committee) {
	foreach ($topics as $topic) {
		$urlnew = 'https://api.fiscalnote.com/bills?apikey=0PF9LT40SUWYR5MR&view=full&legislature=US&status=engrossed&q=' . $topic . '&committee=' . $committee;
		$c->getIt($urlnew);
	}
}

