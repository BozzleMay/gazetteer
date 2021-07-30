<?php

	// remove for production

	//ini_set('display_errors', 'On'
	//error_reporting(E_ALL);

	$executionStartTime = microtime(true);

    $key = 'iAfKIlL2ZsD4eSXZFbbF9VJUrl5Ur65J';

	$url='https://api.windy.com/api/webcams/v2/list/country=' . $_REQUEST['country'] . '/limit=10?show=webcams:location,image,player,url&key=' . $key;

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
	$output['data'] = $decode['result'];
	
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: PUT, GET POST');
    header('Access-Control-Allow-Headers: Origin, X-Requested-with, Content-Type, Accept');
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 
   
?>