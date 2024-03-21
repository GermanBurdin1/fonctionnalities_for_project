<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Autocomplétion</title>
	<link rel='stylesheet' href="./style.css">
	<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
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
	<canvas id="myChart" width="400" height="400"></canvas>
	<canvas id="anotherChart" width="400" height="400"></canvas>
	<div id="tableContainer"></div>
	<script src="./main.js"></script>
</body>

</html>