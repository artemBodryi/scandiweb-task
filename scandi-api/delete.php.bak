<?php
include 'connection.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

$data = json_decode(file_get_contents('php://input'));
$ids = $_GET['ids'];

//loop through the ids and delete corresponding rows
foreach ($ids as $id) {
    $db_connect->query("DELETE FROM products WHERE id = $id");
}

echo json_encode(array("message" => "Items deleted successfully."));
