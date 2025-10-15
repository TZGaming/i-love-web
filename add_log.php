<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'db/db.php';

// Invoer
function vraagInput($prompt) {
    echo $prompt;
    return trim(fgets(STDIN));
}

// Vraag gegevens op
$onderwerp = vraagInput("Onderwerp: ");
$datumInput = vraagInput("Datum (DD-MM-YYYY): ");
$parts = explode('-', $datumInput);

if (count($parts) !== 3) {
    die("Gebruik DD-MM-YYYY.\n");
}

list($dag, $maand, $jaar) = $parts;

// Check datum
if (!checkdate((int)$maand, (int)$dag, (int)$jaar)) {
    die("Ongeldige datum.\n");
}

// Omzetten naar YYYY-MM-DD
$datum = "$jaar-$maand-$dag";

$omschrijving = vraagInput("Omschrijving: ");
$vragen = vraagInput("Vragen: ");
$bronnen = vraagInput("Bronnen: ");

// Connectie naar database
try {
    $stmt = $pdo->prepare("INSERT INTO logs (onderwerp, datum, omschrijving, vragen, bronnen) 
                           VALUES (:onderwerp, :datum, :omschrijving, :vragen, :bronnen)");
    $stmt->execute([
        ':onderwerp' => $onderwerp,
        ':datum' => $datum,
        ':omschrijving' => $omschrijving,
        ':vragen' => $vragen,
        ':bronnen' => $bronnen
    ]);
    echo "Log toegevoegd.\n";
} catch (PDOException $e) {
    echo "Fout bij toevoegen: " . $e->getMessage() . "\n";
}
