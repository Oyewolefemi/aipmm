<?php
// aipmm/api/login.php
session_start(); 
header('Content-Type: application/json');
require_once 'db_connect.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['username']) || !isset($data['password'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing login details']);
    exit;
}

$username = $data['username'];
$password = $data['password'];

try {
    $stmt = $pdo->prepare("SELECT id, username, password_hash FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password_hash'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        
        echo json_encode([
            'status' => 'success', 
            'message' => 'Logged in successfully',
            'user' => ['name' => $user['username'], 'id' => $user['id']]
        ]);
    } else {
        http_response_code(401); 
        echo json_encode(['status' => 'error', 'message' => 'Invalid username or password']);
    }

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error']);
}
?>