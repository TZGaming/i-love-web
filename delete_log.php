<?php

require 'db/db.php';

function vraagInput($prompt) {
    echo $prompt;
    return trim(fgets(STDIN));
}

// Vraag datum in DD-MM-YYYY formaat
$datumInput = vraagInput("Welke datum wil je verwijderen? (DD-MM-YYYY): ");
$parts = explode('-', $datumInput);

if (count($parts) !== 3) {
    die("Gebruik DD-MM-YYYY.\n");
}

list($dag, $maand, $jaar) = $parts;

if (!checkdate((int)$maand, (int)$dag, (int)$jaar)) {
    die("Ongeldige datum.\n");
}

$datum = "$jaar-$maand-$dag"; // Omzetten naar YYYY-MM-DD

// Controleren of er logs zijn op die datum
$stmt = $pdo->prepare("SELECT COUNT(*) FROM logs WHERE datum = :datum");
$stmt->execute([':datum' => $datum]);
$aantal = $stmt->fetchColumn();

if ($aantal == 0) {
    echo "⚠️ Geen logs gevonden op $datumInput\n";
    exit;
}

echo "⚠️ Er zijn $aantal log(s) op $datumInput. Weet je zeker dat je deze wilt verwijderen? (j/n): ";
$bevestiging = trim(fgets(STDIN));

if (strtolower($bevestiging) === 'j') {
    $stmt = $pdo->prepare("DELETE FROM logs WHERE datum = :datum");
    $stmt->execute([':datum' => $datum]);
    echo "$aantal log(s) verwijderd voor $datumInput\n";
} else {
    echo "Verwijderen geannuleerd.\n";
}
