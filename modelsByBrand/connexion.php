<?php

$host = 'localhost';
$dbname = 'locmns';
$user = 'root';
$pass = '';

$dsn = "mysql:host=$host;dbname=$dbname";

try {
    $pdo = new PDO($dsn, $user, $pass);

    if (isset($_GET['brandId'])) {
        $brandId = $_GET['brandId'];
        $sql = "SELECT name FROM model WHERE id_brand = :brandId"; 
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['brandId' => $brandId]);
    } else {
        $search = isset($_GET['search']) ? $_GET['search'] . '%' : 'Acer%'; 
        $sql = "SELECT id_brand, name FROM brand WHERE name LIKE ?"; 
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$search]);
    }

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json');
    echo json_encode($result);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}
?>
