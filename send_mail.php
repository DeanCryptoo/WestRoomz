<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Daten aus dem Formular abfangen
    $abteilung = $_POST['abteilung'] ?? 'Keine Angabe';
    $name = $_POST['name'] ?? 'Keine Angabe';
    $email = $_POST['email'] ?? 'Keine Angabe'; // Das neue E-Mail-Feld!
    $projekt = $_POST['projekt'] ?? 'Keine Angabe';
    $nachricht = $_POST['nachricht'] ?? 'Keine Angabe';

    // 2. An wen soll die E-Mail gehen?
    $to = "adnan@westroomz.de, tomke@westroomz.de, fabian@westroomz.de, noah@westroomz.de";
    
    // 3. Betreff der E-Mail
    $subject = "Neue Anfrage über westroomz.de: " . $projekt;
    
    // 4. Inhalt der E-Mail zusammenbauen
    $body = "Team WESTROOMZ, es gibt eine neue Anfrage über die Webseite:\n\n";
    $body .= "Name: " . $name . "\n";
    $body .= "E-Mail des Kunden: " . $email . "\n";
    $body .= "Abteilung: " . $abteilung . "\n";
    $body .= "Projekt: " . $projekt . "\n\n";
    $body .= "Nachricht:\n" . $nachricht . "\n";

    // 5. Absender-Info für den Server
    $headers = "From: noreply@westroomz.de\r\n";
    $headers .= "Reply-To: " . $email . "\r\n"; // Damit könnt ihr direkt auf "Antworten" klicken!
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // 6. E-Mail absenden und prüfen ob es geklappt hat
    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('Erfolg! Eure Anfrage wurde gesendet.'); window.location.href='index.html';</script>";
    } else {
        echo "<script>alert('Fehler: E-Mail konnte nicht gesendet werden. Bitte überprüft eure Servereinstellungen.'); window.location.href='index.html';</script>";
    }
} else {
    // Falls jemand die Datei direkt aufruft, zurückschicken
    header("Location: index.html");
}
?>
