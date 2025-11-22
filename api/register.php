<?php
// aipmm/api/register.php
header('Content-Type: application/json');
require_once 'db_connect.php';

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['username']) || !isset($data['password']) || !isset($data['email'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
    exit;
}

$username = trim($data['username']);
$email = trim($data['email']);
$password = password_hash($data['password'], PASSWORD_DEFAULT);

try {
    // Check if username exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->execute([$username]);
    if ($stmt->fetch()) {
        echo json_encode(['status' => 'error', 'message' => 'Username already taken']);
        exit;
    }

    // Insert new user
    $sql = "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$username, $email, $password]);

    echo json_encode(['status' => 'success', 'message' => 'User registered successfully']);

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}
?>