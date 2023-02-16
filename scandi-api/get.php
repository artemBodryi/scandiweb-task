<?php
    include 'connection.php';

    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            $sql = "SELECT * FROM products";
            break;
    }

    //run SQL statement
    $result = mysqli_query($db_connect, $sql);
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($data);

    //die if mysql statement failed 
    if(!$result) {
        http_response_code(404);
        die(mysqli_error($db_connect));
    }
    $db_connect->close();
