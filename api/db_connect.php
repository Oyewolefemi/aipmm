<?php
// aipmm/api/db_connect.php

$host = 'localhost';
$db   = 'character_shop'; // Make sure you created this DB in phpMyAdmin
$user = 'root';           // Default XAMPP/MAMP user
$pass = '';               // Default XAMPP/MAMP password (often 'root' for MAMP)
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    // In production, log this error instead of showing it
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}
?>