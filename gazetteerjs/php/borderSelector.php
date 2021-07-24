<?php

    $executionStartTime = microtime(true);

    $countryData = json_decode(file_get_contents("../data/countryBorders.geo.json"), true);

    $border = null;
  //  $country = [];

     foreach ($countryData['features'] as $feature) {

            $temp = null;
            $temp['code'] = $feature["properties"]['iso_a2'];
            
        
  
                
                if ($temp['code'] === $_REQUEST['country']){
                //    array_push($country, $temp);
                    // array_push($country, $feature);
                   $border = $feature;
                 //   break;
        }
        
    }

    $output['status']['code'] = "200";
    $output['status']['geometry'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['executedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output['data'] = $border;
    
    
    header('Content-Type: application/json; charset=UTF-8');

    echo json_encode($output);

?>