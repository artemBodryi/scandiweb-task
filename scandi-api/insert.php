<?php
include 'connection.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$data = json_decode(file_get_contents("php://input"),true);


if (
    isset($data['sku'])
    && isset($data['name'])
    && isset($data['price'])
    && !empty(trim($data['sku']))
    && !empty(trim($data['name']))
    && !empty(trim($data['price']))
) {
    $sku = mysqli_real_escape_string($db_connect, trim($data['sku']));
    $name = mysqli_real_escape_string($db_connect, trim($data['name']));
    $price = mysqli_real_escape_string($db_connect, trim($data['price']));
    $weight = mysqli_real_escape_string($db_connect, trim($data['weight']));
    $size = mysqli_real_escape_string($db_connect, trim($data['size']));
    $length = mysqli_real_escape_string($db_connect, trim($data['length']));
    $width = mysqli_real_escape_string($db_connect, trim($data['width']));
    $height = mysqli_real_escape_string($db_connect, trim($data['height']));


    $add = mysqli_query($db_connect, "INSERT INTO products (sku,name,price,weight,size,length,width,height) values('$sku','$name','$price','$weight','$size','$length','$width','$height')");
    mysqli_close($db_connect);
    print_r([$data]);

    if ($add) {
        $last_id = mysqli_insert_id($db_connect);
        echo json_encode(["success" => true, "msg" => "Data successfully added!"]);
        return;
    } else {
        echo json_encode(["success" => false, "msg" => "Server Problem. Please Try Again"]);
        return;
    }
} else {
    echo json_encode(["success" => false, "msg" => "Please fill all the required fields!"]);
    return;
}


// return json_encode([]); 


