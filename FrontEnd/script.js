const mainTitle = document.querySelector("h1")

// Redirection en page d'accueil au clic sur le h1 "Sophie Bluel architecte d'intérieur"
mainTitle.addEventListener("click", function () {
    window.location.href = "index.html"
})

const btnNavHeader = document.querySelectorAll(".btnNavHeader")

// Permet de modifier l'aspect des liens de navigation lorsqu'ils sont sélectionnés et d'enlever la classe css aux autres
btnNavHeader.forEach((btn) => {
    btn.addEventListener("click", function (event) {
        const btnNavHeaderClicked = event.target
        btnNavHeader.forEach((btn) => {
            btn.classList.remove("btnNavHeaderActive");
        })
        btnNavHeaderClicked.classList.add("btnNavHeaderActive")
    })
})

// Permet de modifier l'aspect des liens de navigation lorsqu'ils sont sélectionnés en cas de rechargement de page (passage de la page login à l'accueil)
if (window.location.hash) {
    const btn = window.location.hash
    // Récupération du bouton, puis de l'initiale du hash actuel mise en majuscule, puis du reste du hash, et ajout d'une classe css à celui-ci
    document.querySelector("#btn" + btn.charAt(1).toUpperCase() + btn.slice(2)).classList.add("btnNavHeaderActive")
}

// Redirections des liens de navigation au clic vers la bonne ancre/page
const btnProjets = document.getElementById("btnProjets")

btnProjets.addEventListener("click", function () {
    window.location.href = "index.html#projets"
})

const btnContact = document.getElementById("btnContact")

btnContact.addEventListener("click", function (){
    window.location.href = "index.html#contact"
})

let loginButton = document.getElementById("login")

loginButton.addEventListener("click", function () {
    window.location.href = "login.html"
})

// Affichage du mode édition si l'utilisateur est connecté
if (window.localStorage.getItem("token")) {
    const editionMode = document.getElementById("editionMode")
    editionMode.classList.remove("displayNone")

    const editionButton = document.getElementById("editionButton")
    editionButton.classList.remove("displayNone")

    const projectTitle = document.querySelector(".projectTitle")
    projectTitle.classList.add("marginProjectTitle")

    const filters = document.querySelector(".filters")
    filters.classList.add("displayNone")

    // Transformation du bouton login en logout et supression du token au clic, et donc du mode édition
    loginButton.innerText = "Logout"

    loginButton.addEventListener("click", function (){
        window.localStorage.removeItem("token")
    })
}