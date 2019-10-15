<?php

$conn = new mysqli("localhost","growayu12","GrowAyu@dy0zy0","growayuassist_pwa");

$payload = json_decode(file_get_contents("php://input"),false);
$response = array();
try{
    $data = new stdClass();
    if(isset($payload->health_seeker_id)){
        $data = update($payload, $payload->health_seeker_id);
    }else{
        $data = insert($payload);
    }
    $response['success'] = 1;
    $response['message'] = "Successfully Created";
    $response['data'] = $data;
    $response['status'] = 200;
}catch(Exception $e){
    $response['success'] = 1;
    $response['message'] = $e->get_message();
    $response['data'] = null;
    $response['status'] = 302;
}
echo json_encode($response,JSON_UNESCAPED_SLASHES);

function insert($payload){
    //Add Health Seeker
    $conn = $GLOBALS['conn'];
    try{
        $conn->autocommit(FALSE);
        $govt_mother_id = $payload->govt_mother_id;
        $mother_name = $payload->mother_name;
        $age = $payload->age;
        $contact_number = $payload->contact_number;
        $occupation = $payload->occupation;
        $husband_name = $payload->husband_name;
        $husband_occupation = $payload->husband_occupation;
        $datetime = date("Y-m-d H:i:s");
        $stmt = $conn->prepare("INSERT INTO health_seeker(govt_mother_id, mother_name, age, contact_number, occupation, husband_name, husband_occupation, created_at, updated_at)VALUES(?,?,?,?,?,?,?,?,?)");
        $stmt->bind_param("sssssssss",$govt_mother_id,$mother_name,$age,$contact_number,$occupation,$husband_name,$husband_occupation,$datetime,$datetime);
        $stmt->execute() or die($stmt->error);
        $health_seeker_id = $stmt->insert_id;
        $conn->commit();

        //get healthseeker by id
        $sql = "SELECT * FROM health_seeker WHERE health_seeker_id = '$health_seeker_id'";
        $stmt = $conn->prepare($sql);
        $stmt->execute() or die($stmt->error);
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        return $row;
    }catch(Exception $e){
        $conn->rollback();
        throw new exception($e->getMessage());
    }finally{

    }

}

function update($payload, $health_seeker_id){
    $conn = $GLOBALS['conn'];
    try{
        $stmt = $conn->prepare("UPDATE health_seeker SET govt_mother_id =? ,mother_name = ? ,age = ? ,contact_number = ?, occupation = ?, husband_name = ?, husband_occupation = ?, updated_at = ? WHERE health_seeker_id = ?");
        $stmt->bind_param("sssssssss",$)
    }
}

?>