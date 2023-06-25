<?php

header("Access-Control-Allow-Origin: http://localhost:3000");

$API_URL = 'https://api.thecatapi.com/v1';

$API_KEY = <CAT_API_KEY>;

$endpoints = [
    "get_breeds_names" => "/breeds",
    "get_images" => "/images/",
    "image_search" => "/images/search?breed_ids="
];

$hostname = $_SERVER['HTTP_HOST'];
