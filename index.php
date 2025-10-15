<?php
require 'db.php';

// Data ophalen, gesorteerd op datum
$stmt = $pdo->query("SELECT * FROM logs ORDER BY datum DESC");
$logs = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Groeperen op datum
$logsPerDatum = [];
foreach ($logs as $log) {
    $datum = $log['datum'];
    if (!isset($logsPerDatum[$datum])) {
        $logsPerDatum[$datum] = [];
    }
    $logsPerDatum[$datum][] = $log;
}
?>

<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <title>Logs Overzicht</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        article { margin-bottom: 40px; }
        section { background: #f4f4f4; padding: 15px; margin-bottom: 10px; border-radius: 8px; }
        h2 { color: #333; }
    </style>
</head>
<body>
    <h1>Logs Overzicht</h1>

    <article>
        <?php foreach ($logsPerDatum as $datum => $entries): ?>
            <section>
                <h2><?= htmlspecialchars($datum) ?></h2>
                <?php foreach ($entries as $entry): ?>
                    <div>
                        <strong>Onderwerp:</strong> <?= htmlspecialchars($entry['onderwerp']) ?><br>
                        <strong>Omschrijving:</strong> <?= nl2br(htmlspecialchars($entry['omschrijving'])) ?><br>
                        <strong>Vragen:</strong> <?= nl2br(htmlspecialchars($entry['vragen'])) ?><br>
                        <strong>Bronnen:</strong> <?= nl2br(htmlspecialchars($entry['bronnen'])) ?>
                    </div>
                    <hr>
                <?php endforeach; ?>
            </section>
        <?php endforeach; ?>
    </article>
</body>
</html>