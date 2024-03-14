let choix = document.querySelector("#choix");
let liste = document.querySelector("#liste");

choix.addEventListener("input", function(e) {
    let searchQuery = this.value;
    
    if (searchQuery.length === 0) {
        liste.innerHTML = '';
        return;
    }

    let url = `/js/autocompletion/connexion.php?search=${encodeURIComponent(searchQuery)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            liste.innerHTML = '';
            data.forEach(item => {
                let option = document.createElement("option");
                option.value = item.ville_nom; 
                option.textContent = item.ville_nom; 
                liste.appendChild(option);
            });
        })
        .catch(error => console.error('Erreur:', error));
});
