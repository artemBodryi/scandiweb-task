<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: DELETE, GET, POST, OPTIONS, PUT");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 86400");
header("Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Requested-With");
$db_connect = mysqli_connect("localhost", "root", "Artem%60805", "scandiweb");
//$db_connect = mysqli_connect("localhost", "id20266296_root", "Da6&s8T&k|r<v&c_", "id20266296_scandiweb");

if($db_connect === false) {
    die("Error: Could not connect to server. " .mysqli_connect_error());
}
?>






