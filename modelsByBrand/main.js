document.addEventListener("DOMContentLoaded", function () {
  let choix = document.querySelector("#choix");
  let liste = document.querySelector("#liste");
  let brandsList = document.querySelector("#brandsList");
  let brands = [];

  function searchBrands(searchQuery) {
    if (searchQuery.length < 2) {
      liste.innerHTML = "";
      brandsList.innerHTML = "";
      brands = [];
      return;
    }

    let url = `/js/modelsByBrand/connexion.php?search=${encodeURIComponent(
      searchQuery
    )}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        brands = data;
        brandsList.innerHTML = "";
        data.forEach((brand) => {
          let option = document.createElement("option");
          option.value = brand.name;
          brandsList.appendChild(option);
        });
      })
      .catch((error) =>
        console.error("Erreur lors de recherche de la marque:", error)
      );
  }

  choix.addEventListener("input", function (e) {
    searchBrands(this.value);
  });

  function searchModelsByBrandId(brandId) {
    let urlModels = `/js/modelsByBrand/connexion.php?brandId=${encodeURIComponent(
      brandId
    )}`;

    fetch(urlModels)
      .then((response) => response.json())
      .then((modelsData) => {
        liste.innerHTML = "";
        modelsData.forEach((item) => {
          let li = document.createElement("li");
          li.textContent = item.name;
          li.style.cursor = "pointer";
          li.onclick = () => alert(`Modèle choisi: ${item.name}`);
          liste.appendChild(li);
        });
      })
      .catch((error) =>
        console.error("Erreur lors du chargement du modèle:", error)
      );
  }

  choix.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const selectedBrandName = this.value;
      const selectedBrand = brands.find(
        (brand) => brand.name === selectedBrandName
      );
      if (selectedBrand) {
        searchModelsByBrandId(selectedBrand.id_brand);
        loadChartDataForBrand(selectedBrand.id_brand);
      } else {
        console.log("Le brand n'est pas choisi");
      }
    }
  });

  function displayDataInTable(data) {
    const table = document.createElement("table");
    table.innerHTML = `
        <tr>
            <th>Brand</th>
            <th>Count</th>
        </tr>
    `; // Заголовки таблицы

    data.forEach((item) => {
      const row = table.insertRow(-1); // Добавляет новую строку
      const brandCell = row.insertCell(0); // Добавляет ячейку для названия бренда
      const countCell = row.insertCell(1); // Добавляет ячейку для количества моделей

      brandCell.textContent = item.brandName || item.typeName; // Заполнение ячейки названием бренда
      countCell.textContent = item.modelsCount; // Заполнение ячейки количеством моделей
    });

    // Найти место в документе, куда вставлять таблицу, и добавить её
    const container = document.getElementById("tableContainer");
    container.innerHTML = ""; // Очистить предыдущее содержимое
    container.appendChild(table);
  }

  function loadChartDataForBrand(brandId) {
    let urlForBrand = `/js/modelsByBrand/connexion.php?brandId=${brandId}&type=specificDataForChart`;
    loadChartData(urlForBrand, "myChart", "Données par marque");
  }

  function loadChartData(url, chartElementId, chartLabel) {
    console.log("loadChartData called");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        displayDataInTable(data);
        const labels = data.map((item) => item.brandName || item.typeName);
        const counts = data.map((item) => item.modelsCount);
        console.log(document.getElementById(chartElementId));
        const ctx = document.getElementById(chartElementId).getContext("2d");
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: chartLabel,
                data: counts,
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      })
      .catch((error) =>
        console.error(
          "Erreur lors du chargement des données du graphique:",
          error
        )
      );
  }
});
