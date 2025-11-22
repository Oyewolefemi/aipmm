<?php
// aipmm/api/save_order.php
session_start();
header('Content-Type: application/json');
require_once 'db_connect.php';

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    http_response_code(403);
    echo json_encode(['status' => 'error', 'message' => 'You must be logged in to save a persona.']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (!isset($data['name']) || !isset($data['choices'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing persona data']);
    exit;
}

$userId = $_SESSION['user_id'];
$charName = $data['name'];
$charData = json_encode($data['choices']); // The visual configuration
$notes = isset($data['notes']) ? $data['notes'] : ''; // Mood/Organization description

// Append notes to the character data object
$finalJsonData = json_decode($charData, true);
$finalJsonData['__notes'] = $notes;
$finalJsonData = json_encode($finalJsonData);

try {
    $sql = "INSERT INTO characters (user_id, character_name, character_data, status) VALUES (?, ?, ?, 'pending')";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$userId, $charName, $finalJsonData]);

    $orderId = $pdo->lastInsertId();

    echo json_encode([
        'status' => 'success', 
        'message' => 'Persona saved successfully! Order ID: ' . $orderId,
        'order_id' => $orderId
    ]);

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Save failed: ' . $e->getMessage()]);
}
?>