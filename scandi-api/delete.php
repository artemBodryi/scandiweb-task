<?php
include 'connection.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

$data = json_decode(file_get_contents('php://input'));
if (isset($data->data) && isset($data->data->ids) && !empty($data->data->ids)) {
  $ids = $data->data->ids;
  print_r($ids);
  //loop through the ids and delete corresponding rows
  foreach ($ids as $id) {
      $db_connect->query("DELETE FROM products WHERE id = $id");
  }
  echo json_encode(array("message" => "Items deleted successfully."));
} else {
  echo json_encode(array("message" => "Invalid request data."));
}
