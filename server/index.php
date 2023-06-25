<?php

header("Access-Control-Allow-Origin: http://localhost:3000");

$API_URL = 'https://api.thecatapi.com/v1';

$API_KEY = "live_nRUopoBMTb3ODHwZJO3wjJDIcp91Mup5Lu01lS2hTJpM4HlAmEPHV75sb5q8gPNh";

$endpoints = [
    "get_breeds_names" => "/breeds",
    "get_images" => "/images/",
    "image_search" => "/images/search?breed_ids="
];

$hostname = $_SERVER['HTTP_HOST'];
