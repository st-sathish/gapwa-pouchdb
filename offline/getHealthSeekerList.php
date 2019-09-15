<?php

$conn = new mysqli("localhost", "root", "root", "growayuassist_pwa");

$payload = json_decode(file_get_contents("php://input"), false);
$response = array();
try {
	$mode = $payload->mode;
	$query = "SELECT * from health_seeker where mode = '$mode'";
    $result = mysqli_query($conn, $query);
    $data = array();
	while($row = mysqli_fetch_assoc($result)) {
		$data[] = $row;
	}
	$response["success"] = 1;
	$response["message"] = "Successfully inserted";
	$response["data"] = $data;
	$response["status"] = 200;
} catch(Exception $e) {
	$response["success"] = 0;
	$response["message"] = $e->getMessage();
	$response["status"] = 302;
}
echo json_encode($response, JSON_UNESCAPED_SLASHES);
