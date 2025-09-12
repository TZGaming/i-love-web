<?php
require 'db/db.php';

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
    <link rel="stylesheet" href="styles/style.css">
</head>
<body>
    <div class="mushroom"></div>
    <div class="flower"></div>

    <h1>Logs Overzicht</h1>

    <article>
        <?php foreach ($logsPerDatum as $datum => $entries): ?>
            <section>
                <h2><?= date('d-m-Y', strtotime($datum)) . ' - ' . htmlspecialchars($entries[0]['onderwerp']) ?></h2>
                <hr>
                <?php foreach ($entries as $entry): ?>
                    <div>
                        <strong>Omschrijving:<br></strong> <?= nl2br(htmlspecialchars($entry['omschrijving'])) ?><br>
                        <strong><br>Vragen:<br></strong> <?= nl2br(htmlspecialchars($entry['vragen'])) ?><br>
                        <strong><br>Bronnen:<br></strong> <?= nl2br(htmlspecialchars($entry['bronnen'])) ?>
                    </div>
                <?php endforeach; ?>
            </section>
        <?php endforeach; ?>
    </article>
</body>
</html>