<?php

$host = 'localhost';
$dbname = 'france';
$user = 'root';
$pass = '';

$dsn = "mysql:host=$host;dbname=$dbname";

try {
    $pdo = new PDO($dsn, $user, $pass);

    $search = isset($_GET['search']) ? $_GET['search'] . '%' : 'A%';

    $sql = "SELECT ville_nom FROM villes_france_free WHERE ville_nom LIKE ?";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$search]);

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($result);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}
?>
