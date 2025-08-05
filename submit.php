<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "portfolio";

// ? Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form values safely
$name = $_POST['name'] ?? '';
$phone = $_POST['phone'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';

// Optional: Validate inputs here (not mandatory)


// Prepare and bind
$stmt = $conn->prepare("INSERT INTO mahesh (name, phone, email, message) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $phone, $email, $message);

// Execute and check
if ($stmt->execute()) {
    echo "Thanks for contacting!";
    // Optional: Redirect after success
    // header("Location: thankyou.html");
    // exit();
} else {
    echo "Error: " . $stmt->error;
}

// Close connections
$stmt->close();
$conn->close();
?>
