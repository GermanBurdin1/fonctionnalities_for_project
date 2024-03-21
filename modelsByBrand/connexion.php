<?php

$host = 'localhost';
$dbname = 'locmns';
$user = 'root';
$pass = '';

$dsn = "mysql:host=$host;dbname=$dbname";

try {
    $pdo = new PDO($dsn, $user, $pass);

    header('Content-Type: application/json');

    if (isset($_GET['type'])) {
        if ($_GET['type'] === 'brandsModelsCount') {
            $sql = "SELECT b.name AS brandName, COUNT(m.id_model) AS modelsCount FROM brand b JOIN model m ON b.id_brand = m.id_brand GROUP BY b.name";
        } elseif ($_GET['type'] === 'typesModelsCount') {
            $sql = "SELECT t.name AS typeName, COUNT(m.id_model) AS modelsCount FROM type t JOIN model m ON t.id_type = m.Id_type GROUP BY t.name";
        } else {
            throw new Exception("Unknown request type.");
        }
        $stmt = $pdo->query($sql);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
    } elseif (isset($_GET['brandId'])) {
        $brandId = $_GET['brandId'];
        $sql = "SELECT name FROM model WHERE id_brand = :brandId";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['brandId' => $brandId]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
    } elseif (isset($_GET['search'])) {
        $search = $_GET['search'] . '%';
        $sql = "SELECT id_brand, name FROM brand WHERE name LIKE ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$search]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
    } else {
        throw new Exception("Les paramètres ne sont pas valides.");
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
