<?php

$host = 'localhost';
$dbname = 'locmns';
$user = 'root';
$pass = '';

$dsn = "mysql:host=$host;dbname=$dbname";

try {
    $pdo = new PDO($dsn, $user, $pass);

    if ($_GET['type'] === 'brandsModelsCount') {
        $sql = "SELECT b.name AS brandName, COUNT(m.id_model) AS modelsCount FROM brand b JOIN model m ON b.id_brand = m.id_brand GROUP BY b.name";
    } else if ($_GET['type'] === 'typesModelsCount') {
        $sql = "SELECT t.name AS typeName, COUNT(m.id_model) AS modelsCount FROM type t JOIN model m ON t.id_type = m.Id_type GROUP BY t.name";
    } else {
        throw new Exception("Type de requête inconnu.");
    }

    $stmt = $pdo->query($sql);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($result);

} catch (Exception $e) {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['error' => $e->getMessage()]);
}
?>
