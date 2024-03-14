<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Autocomplétion</title>
</head>

<body>
    <h1>Rentrez votre modèle:</h1>
    <label for="choix">Marque:</label>
    <input type="text" id="choix" list="brandsList">
    <datalist id="brandsList">

    </datalist>

    <label for="liste">Modèles:</label>
    <ul id="liste">
    </ul>

    <script src="./main.js"></script>
</body>

</html>