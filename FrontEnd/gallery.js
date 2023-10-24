const works = await fetch("http://localhost:5678/api/works").then(works => works.json())
const category = await fetch ("http://localhost:5678/api/categories").then(category => category.json())
const DEFAULT_CATEGORY = "Tous";

// Création de tableaux servant à la fonction de suppression des travaux
const workElements = []
let imgElement = []

// Fonction permettant d'afficher les travaux et de les supprimer
// figure = work[i] pour les galeries || figure = filterWorks pour les filtres || figure = data pour l'envoi de nouveaux travaux
export function displayGallery(figure) {

    // Récupère la galerie principale et la galerie dans la modale servant à la suppression des travaux
    let galleries = document.querySelectorAll(".jsGallery")

    imgElement = []

    galleries.forEach(div => { 
        const workElement = document.createElement("figure")
        imgElement.push(workElement)
        div.appendChild(workElement)

        const imageElement = document.createElement("img")
        imageElement.src = figure.imageUrl
        workElement.appendChild(imageElement)

        // Création des légendes uniquement pour la galerie principale
        if (div.classList.contains("gallery")) {
            const captionElement = document.createElement("figcaption")
            captionElement.innerText = figure.title
            workElement.appendChild(captionElement)

        // Création des icones de poubelles et fonction de suppression des travaux pour la gallerie de la modale
        } else {
            const deleteButton = document.createElement("button")
            deleteButton.classList.add("jsDeleteButton")
            deleteButton.setAttribute("data-id", figure.id)
            const trash = document.createElement("i")
            trash.classList.add("fa-solid", "fa-trash-can", "fa-xs")
            workElement.appendChild(deleteButton)
            deleteButton.appendChild(trash)

            deleteButton.addEventListener("click", function(event) {
                const target = event.currentTarget
                const workId = target.getAttribute("data-id")
                let token = window.localStorage.getItem("token")
                fetch (`http://localhost:5678/api/works/${workId}`, {
                    method: "DELETE",
                    headers: {
                        accept: "*/*",
                        Authorization:`Bearer ${token}`
                    }
                }).then(() => {
                    workElements[workId][0].remove()
                    workElements[workId][1].remove()
                }) 
            })
        }
    })
    // On ajoute le tableau imgElement des deux figures relatives à chaque galeries dans le tableau worksElements, positionnés en fonction de leur id
    workElements[figure.id] = imgElement
}

// Lancement de la fonction d'affichage pour chaque objet via l'api
function displayWorks(works) {
    for (let i=0; i < works.length; i++) {
        const figure = works[i]
        displayGallery(figure)
    }
}

displayWorks(works)

// Fonction qu créé des boutons servant à filtrer les travaux en fonction de leur catégorie associée
function createButton(text, divFilter) {
    const buttonDefault = document.createElement("button");
    buttonDefault.innerText = text;
    buttonDefault.className = "filterStyle"
    divFilter.appendChild(buttonDefault)

    buttonDefault.addEventListener("click", function (event) {
        const btnClicked = event.target
        let filterWorks = works
        // Si le paramètre "text" de la fonction est autre que "tous", on filtre les travaux en récupérant tous ceux dont le nom de catégorie lui est égal
        if (DEFAULT_CATEGORY !== text) {
            filterWorks = works.filter(function (works) {
                return works.category.name === text
            })
        }
        
        // Utilisation de la fonction displayWorks pour afficher les travaux filtrés
        document.querySelector(".gallery").innerHTML = ""
        displayWorks(filterWorks)

        // Ajoute une classe css différente quand un bouton est actif et supprime cette classe du bouton précédemment actif
        document.querySelectorAll('.filterStyle').forEach((btn) => {
            btn.classList.remove('active')
        });
        btnClicked.classList.add('active')
    });
}

// Affichage des boutons de filtre et des travaux filtrés en appellant la fonction createButton pour chaque catégorie de travaux
function displayFilters(category) {

    const divFilter =  document.querySelector(".filters")
    // Premier appel pour le bouton par défaut "tous"
    createButton(DEFAULT_CATEGORY, divFilter);
    
    // Appels pour chaque catégorie de travaux
    for (let i=0; i < category.length; i++) {
        const categoryElement = category[i]
        createButton(categoryElement.name, divFilter);
    }
}

displayFilters(category)