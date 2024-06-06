<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

$uname = $_POST['uname'];
$upass  = $_POST['upass'];
$uemail = $_POST['uemail'];

if (!empty($uname) && !empty($upass) && !empty($uemail)) {
    $host = "localhost";
    $dbusername = "root";
    $dbpassword = "";
    $dbname = "green_horizon";

    // Create connection
    $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

    if ($conn->connect_error) {
        die('Connect Error ('. $conn->connect_errno .') '. $conn->connect_error);
    } else {
        $SELECT = "SELECT uemail FROM register WHERE uemail = ? LIMIT 1";
        $INSERT = "INSERT INTO register (uname, upass, uemail) VALUES (?, ?, ?)";

        // Prepare statement
        $stmt = $conn->prepare($SELECT);
        $stmt->bind_param("s", $uemail);
        $stmt->execute();
        $stmt->bind_result($uemail);
        $stmt->store_result();
        $rnum = $stmt->num_rows;

        if ($rnum == 0) {
            $stmt->close();
            $stmt = $conn->prepare($INSERT);
            // Hash the password before inserting into the database
            $hashed_pass = password_hash($upass, PASSWORD_DEFAULT);
            $stmt->bind_param("sss", $uname, $hashed_pass, $uemail);
            $stmt->execute();
            echo "New record inserted successfully";
        } else {
            echo "Someone already registered using this email";
        }
        $stmt->close();
        $conn->close();
    }
} else {
    echo "All fields are required";
    die();
}
?>
