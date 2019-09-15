<?php
include "../config.php";
$response = array();
$post_data = json_decode(file_get_contents("php://input"));

$sql = "select * from health_care_centre where hcc_type = 'DSSH'  order by hcc_name";
$result = mysqli_query($conn, $sql);
$i=0;
while ($row = mysqli_fetch_assoc($result)) {
    $response[$i]['hcc_id'] = $row['hcc_id'];
    $response[$i]['hcc_name'] = $row['hcc_name'];
    $response[$i]['alias'] = $row['alias'];
    $response[$i]['status'] = $row['status'];
    $i++;
}
echo json_encode($response, JSON_UNESCAPED_SLASHES);
