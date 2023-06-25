<?php

require_once "index.php";

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo "Invalid Request!";
    exit;
}

$typeParameter = $_GET['type'];

if (!isset($typeParameter)) {
    echo "Invalid Params";
    exit;
}

$errorResponse = ["message" => "Something went wrong"];

$catBreeds = getAllCatBreedsNames();

if ($typeParameter === 'get-breeds') {
    echo json_encode($catBreeds);
} elseif ($typeParameter === 'get-intro-breeds-images') {
    $breedsIdsToFetch = [
        "beng",
        "norw",
        "sava",
        "srex",
    ];

    $breedNames = [
        $breedsIdsToFetch[0] => "bengal",
        $breedsIdsToFetch[1] => "norwegian forest cat",
        $breedsIdsToFetch[2] => "savannah",
        $breedsIdsToFetch[3] => "selkirk rex",
    ];

    $heroSectionBreedsImages = getSpecificBreedImage($breedsIdsToFetch, $breedNames);
    echo json_encode($heroSectionBreedsImages);
} else if ($typeParameter === 'get-top-ten') {
    $topTenSearchedBreeds = getTopTenSearchedBreeds($catBreeds);

    echo json_encode($topTenSearchedBreeds);
} else if ($typeParameter === 'get-breed' && !isset($_GET['breed-name'])) {
    echo json_encode(["message" => "missing parameter"]);
} else if ($typeParameter === 'get-breed-images' && isset($_GET['breed-id'])) {
    $breedId = $_GET['breed-id'];
    $breedImages = getSelectedBreedImages($breedId);

    echo json_encode($breedImages);
}

function getAllCatBreedsNames()
{
    global $errorResponse, $API_URL, $API_KEY, $endpoints;

    $getBreedsNamesURL = $API_URL . $endpoints['get_breeds_names'];

    $getBreedsNames = curl_init($getBreedsNamesURL);

    curl_setopt_array($getBreedsNames, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            "x-api-key: $API_KEY",
        ]
    ]);

    $response = curl_exec($getBreedsNames);

    if ($response === false) {
        echo json_encode($errorResponse);
        exit;
    }

    $fetchedCatBreeds = json_decode($response, true);

    curl_close($getBreedsNames);

    return $fetchedCatBreeds;
}

function getTopTenSearchedBreeds(array $catBreeds)
{
    $highestScoreBreeds = [];

    foreach ($catBreeds as $breed) {
        $score = $breed['adaptability'] + $breed['affection_level'] + $breed['child_friendly'] +
            $breed['dog_friendly'] + $breed['energy_level'] + $breed['grooming'] + $breed['intelligence'] +
            $breed['social_needs'] + $breed['stranger_friendly'] + $breed['vocalisation'] + $breed['natural'] + $breed['rare'];

        $highestScoreBreeds[] = [
            "id" => $breed['id'],
            "imageUrl" => @$breed['image']['url'] ?? "",
            "name" => $breed['name'],
            "description" => $breed['description'],
            "score" => $score
        ];
    }

    // Sort the array based on the score since the API doesn't provide information about top searched breeds.
    usort($highestScoreBreeds, fn ($a, $b) => $b['score'] <=> $a['score']);

    $onlyTenArray = array_slice($highestScoreBreeds, 0, 10);
    return $onlyTenArray;
}

function getSpecificBreedImage($breedsIdsToFetch, $breedsNames)
{
    global $errorResponse, $API_URL, $endpoints;


    $imagesArr = [];

    foreach ($breedsIdsToFetch as $id) {
        $imageSearchURL = $API_URL . $endpoints['image_search'] . $id;
        $getImages = curl_init($imageSearchURL);

        curl_setopt_array($getImages, [
            CURLOPT_RETURNTRANSFER => true,
        ]);

        $response = curl_exec($getImages);

        if ($response === false) {
            echo json_encode($errorResponse);
            exit;
        }

        $breedsInfo = json_decode($response, true);

        $breedId = $breedsInfo[0]['id'] ?? (rand(1, 10000000) * 1000);
        $breedName = $breedsNames[$id];
        $breedImageUrl = $breedsInfo[0]['url'] ?? "";

        $imagesArr[] = [
            "id" => $breedId,
            "breedName" => $breedName,
            "imageUrl" => $breedImageUrl
        ];

        curl_close($getImages);
    }

    return $imagesArr;
}

function getSelectedBreedImages(string $breedId)
{
    global $API_URL, $API_KEY,  $endpoints, $errorResponse;

    $imageSearchURL = $API_URL . $endpoints['image_search'] . $breedId . '&limit=9';

    $getImages = curl_init($imageSearchURL);

    curl_setopt_array($getImages, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            "x-api-key: $API_KEY",
        ],
    ]);

    $response = curl_exec($getImages);
    if (!$response) {
        return $errorResponse;
    }

    return $response;
}
