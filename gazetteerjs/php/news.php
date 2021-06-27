<?php

	// remove for production

	//ini_set('display_errors', 'On'
	//error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	$url='https://newsdata.io/api/1/news?apikey=pub_428274334c85180dce1afb43b3b73825487' . '&country=' . $_REQUEST['results'];
    //$url = 'https://newsdata.io/api/1/news?apikey=pub_428274334c85180dce1afb43b3b73825487&country=au';

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data'] = $decode['results'];
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 
   
?>