<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: DELETE, GET, POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$db_connect = mysqli_connect("127.0.0.1", "root", "1234567890", "scandiweb");

if($db_connect === false) {
    die("Error: Could not connect to server. " .mysqli_connect_error());
}
?>