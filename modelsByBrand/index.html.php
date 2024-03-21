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
	<canvas id="myChart" width="400" height="400"></canvas>
	<canvas id="anotherChart" width="400" height="400"></canvas>
	<script src="./main.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</body>

</html>