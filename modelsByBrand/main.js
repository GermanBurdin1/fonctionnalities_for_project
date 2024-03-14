// let choix = document.querySelector("#choix");
// let liste = document.querySelector("#liste");
// let brands = []; 

// function searchBrands(searchQuery) {
//     if (searchQuery.length < 2) {
//         liste.innerHTML = '';
//         brands = []; 
//         return;
//     }

//     let url = `/js/modelsByBrand/connexion.php?search=${encodeURIComponent(searchQuery)}`;

//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             brands = data;
//             console.log(JSON.stringify(brands)); 
//         })
//         .catch(error => console.error('Ошибка при поиске марки:', error));
// }

// choix.addEventListener("input", function(e) {
//     searchBrands(this.value);
// });

// choix.addEventListener("keypress", function(e) {
//     if (e.key === "Enter") {
//         console.log(e);
//         e.preventDefault(); 
//         if (brands.length > 0) {
//             console.log(brands);
//             let brandId = brands[0].id_brand; 
//             searchModelsByBrandId(brandId);
//         }
//     }
// });

// function searchModelsByBrandId(brandId) {
//     let urlModels = `/js/modelsByBrand/connexion.php?brandId=${encodeURIComponent(brandId)}`;

//     fetch(urlModels)
//         .then(response => response.json())
//         .then(modelsData => {
//             liste.innerHTML = ''; 
//             modelsData.forEach(item => {
//                 let li = document.createElement("li");
//                 li.textContent = item.name;
//                 li.style.cursor = "pointer";
//                 li.onclick = () => alert(`Выбрана модель: ${item.name}`); 
//                 liste.appendChild(li);
//             });
//         })
//         .catch(error => console.error('Ошибка при загрузке моделей:', error));
// }


let choix = document.querySelector("#choix");
let liste = document.querySelector("#liste");
let brandsList = document.querySelector("#brandsList"); 
let brands = []; 


function searchBrands(searchQuery) {
    if (searchQuery.length < 2) {
        liste.innerHTML = '';
        brandsList.innerHTML = ''; 
        brands = [];
        return;
    }

    let url = `/js/modelsByBrand/connexion.php?search=${encodeURIComponent(searchQuery)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            brands = data;
            brandsList.innerHTML = ''; 
            data.forEach(brand => {
                let option = document.createElement("option");
                option.value = brand.name;
                brandsList.appendChild(option);
            });
        })
        .catch(error => console.error('Ошибка при поиске марки:', error));
}

choix.addEventListener("input", function(e) {
    searchBrands(this.value);
});

function searchModelsByBrandId(brandId) {
    let urlModels = `/js/modelsByBrand/connexion.php?brandId=${encodeURIComponent(brandId)}`;

    fetch(urlModels)
        .then(response => response.json())
        .then(modelsData => {
            liste.innerHTML = ''; 
            modelsData.forEach(item => {
                let li = document.createElement("li");
                li.textContent = item.name;
                li.style.cursor = "pointer";
                li.onclick = () => alert(`Выбрана модель: ${item.name}`); 
                liste.appendChild(li);
            });
        })
        .catch(error => console.error('Ошибка при загрузке моделей:', error));
}

choix.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        e.preventDefault(); 
        const selectedBrandName = this.value; 
        const selectedBrand = brands.find(brand => brand.name === selectedBrandName);  
        if (selectedBrand) {
            searchModelsByBrandId(selectedBrand.id_brand); 
        } else {
            console.log("Марка не найдена или не выбрана");
        }
    }
});