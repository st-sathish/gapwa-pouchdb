<?php
/*
create database growayuassist_pwa
create table health_seeker(health_seeker_id int(11) NOT NULL AUTO_INCREMENT, name varchar(255), age int(11), mobile bigint(11), mode ENUM('online','offline') 
NOT NULL DEFAULT  'online', created_at datetime, updated_at datetime, hcc_id int(11), PRIMARY KEY (`health_seeker_id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/
$conn = new mysqli("localhost", "root", "root", "growayuassist_pwa");

$payload = json_decode(file_get_contents("php://input"), false);
$response = array();
if(isset($payload->hcc_id)) {
	$hcc_id = $payload->hcc_id;
	$seqcode = PREG_MOM_SEQUENCE_CODE;
	//$response["id"] = $payload->id;
	try {
		$data = new stdClass;
		if(isset($payload->health_seeker_id)) {
			$data = update($hcc_id, $payload, $seqcode, $payload->health_seeker_id);
		} else {
			$data = insert($hcc_id, $payload, $seqcode);
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
}

function insert($hcc_id, $health_seeker, $seqcode) {
	$growayu_health_seeker_id = 0;
	$conn = $GLOBALS['conn'];
	try {
		$conn->autocommit(FALSE);
        // insert health_seeker
		$name = $health_seeker->name;
		$age = $health_seeker->age;
		$mobile = $health_seeker->mobile;
		$mode = 'online';
		$date_time = date("Y-m-d H:i:s");
		if(isset($health_seeker->mode)) {
			$mode = $health_seeker->mode;
		}
        $stmt = $conn->prepare("INSERT INTO health_seeker(name,age,mobile,mode,created_at,updated_at) 
			VALUES (?,?,?,?,?,?)");
    	$stmt->bind_param("ssssss", $name, $age, $mobile, $mode, $date_time, $date_time);
		if ($stmt->execute() == false) {
            throw new Exception($stmt->error);
        }
		$growayu_health_seeker_id = $stmt->insert_id;
        $conn->commit();

        //get health seeker by id;
        $query = "SELECT * from health_seeker where health_seeker_id = '$growayu_health_seeker_id'";
        $result = mysqli_query($conn, $query);
		$row = mysqli_fetch_assoc($result);
		return $row;
	} catch(Exception $e) {
        $conn->rollback();
        throw $e;
	} finally {
		// close the connection
	}
}

function update($hcc_id, $health_seeker, $seqcode, $health_seeker_id) {
	$conn = $GLOBALS['conn'];
	try {
		$conn->autocommit(FALSE);
		$date_time = date("Y-m-d H:i:s");
		$stmt = $conn->prepare("UPDATE health_seeker set name=?,age=?,mobile=?,updated_at=? WHERE health_seeker_id=?");
    	$stmt->bind_param("sssss", $name, $age, $mobile, $date_time, $health_seeker_id);
		if ($stmt->execute() == false) {
            throw new Exception($stmt->error);
        }
		$conn->commit();
		//get health seeker by id;
        $query = "SELECT * from health_seeker where health_seeker_id = '$health_seeker_id'";
        $result = mysqli_query($conn, $query);
		$row = mysqli_fetch_assoc($result);
		return $row;
	} catch(Exception $e) {
        $conn->rollback();
        throw $e;
	} finally {
		// close the connection
	}
}

function find_hcc_health_seeker($hcc_id, $patient_id) {
	$query = "SELECT * FROM hcc_health_seeker WHERE hcc_id = '$hcc_id' AND (patient_id = '$patient_id' OR offline_patient_id = '$patient_id')";
	$result = mysqli_query($GLOBALS['conn'], $query);
	$row = mysqli_fetch_array($result);
	return $row;
}
