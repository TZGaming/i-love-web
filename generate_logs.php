<?php
require 'db/db.php';

header('Content-Type: application/json');

$stmt = $pdo->query("SELECT * FROM logs ORDER BY datum DESC");
$logs = $stmt->fetchAll(PDO::FETCH_ASSOC);

file_put_contents('logs.json', json_encode($logs, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo "logs.json succesvol gegenereerd.\n";