<?php

    $executionStartTime = microtime(true);

    $countryData = json_decode(file_get_contents("../data/countryBorders.geo.json"), true);

    $borders = [];

    foreach ($countryData['features'] as $feature) {

        $temp = null;
        $temp['code'] = $feature["properties"]['iso_a2'];
        $temp['geometry'] = $feature["geometry"]['coordinates'];

        if ($temp['code'] ===  $_REQUEST['country']){
        array_push($borders, $temp);
        }
        
    }

    usort($borders, function ($item1, $item2) {

        return $item1['geometry'] <=> $item2['geometry'];

    });

    $output['status']['code'] = "200";
    $output['status']['geometry'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['executedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output['data'] = $borders;
    
    header('Content-Type: application/json; charset=UTF-8');

    echo json_encode($output);

?>