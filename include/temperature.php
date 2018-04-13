<?php

$key = "";
$lat = $_POST['lat'];
$long = $_POST['long'];
$url = "http://api.apixu.com/v1/current.json?key=$key&q=" . $lat . "," . $long . "&=";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$json_output = curl_exec($ch);
$weather = json_decode($json_output);
$info = array(
    'temp_c' => $weather->current->temp_c,
    'feelslike_c' => $weather->current->feelslike_c,
    'cond_icon' => $weather->current->condition->icon
);
echo json_encode($info);
