<?php
$uname = $_POST['username'];
$upass  = $_POST['password'];

if (!empty($uname) && !empty($upass)) {
    $host = "localhost";
    $dbusername = "root";
    $dbpassword = "";
    $dbname = "green_horizon";

    // Create connection
    $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

    if ($conn->connect_error) {
        die('Connect Error (' . $conn->connect_errno . ') ' . $conn->connect_error);
    } else {
        $SELECT = "SELECT uname, upass FROM register WHERE uname = ? AND upass = ?";
        $stmt = $conn->prepare($SELECT);
        $stmt->bind_param("ss", $uname, $upass);
        $stmt->execute();
        $stmt->store_result();
        
        if ($stmt->num_rows > 0) {
            echo json_encode(["status" => "success", "message" => "Login successful"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Incorrect username or password"]);
        }
        $stmt->close();
        $conn->close();
    }
} else {
    echo json_encode(["status" => "error", "message" => "All fields are required"]);
}
?>
