import {displayGallery} from "./gallery.js"
const category = await fetch ("http://localhost:5678/api/categories").then(category => category.json())

let modal = null
const focusableSelector = "input, button"
let focusables = []
let previouslyFocusedElement = null

// Fonction qui affiche la modale et créé ses différentes fonctionalités 

const openModal = function (e) {
    e.preventDefault()
    modal = document.querySelector(e.currentTarget.getAttribute("href"))
    // Création d'un tableau des éléments focusables au clavier
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
    // Enregistre le focus sur le dernier élément sélectionné avant l'ouverture de la modale
    previouslyFocusedElement = document.querySelector(":focus")
    // Affichage de la modale
    modal.style.display = null
    // Débute le focus clavier sur le premier élément focusable
    focusables[0].focus()
    modal.removeAttribute("aria-hidden")
    modal.setAttribute("aria-modal", "true")
    // Fermeture de la modale au clic à l'extérieur de la boite
    modal.addEventListener("click", closeModal)
    // Stoppe la propagation de l'instruction précédente : permet de ne pas fermer la modale quand le clic est effectué au sein de la boite
    modal.querySelector(".jsModalStop").addEventListener("click", stopPropagation)
    // Fermeture de la modale au clic sur les croix des différentes pages
    modal.querySelectorAll(".jsCloseModal").forEach (x => { x.addEventListener("click", closeModal)})
}

// Fonction qui ferme la modale

const closeModal = function (e) {
    if (modal === null) return
    // Garde le focus sur le dernier élément sélectionné avant l'ouverture de la modale en cas de fermeture
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus()
    e.preventDefault()
    // Donne un délai au display none permettant de voir l'animation de fade
    window.setTimeout(function () {
        modal.style.display = "none"
        modal = null
    }, 500)
    modal.setAttribute("aria-hidden" , true)
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click", closeModal)
    modal.querySelectorAll(".jsCloseModal").forEach (x => { x.removeEventListener("click", closeModal)})
    modal.querySelectorAll(".jsCloseModal").forEach (x => { x.removeEventListener("click", stopPropagation)})
    // Appel de la fonction qui réinitialise le formulaire d'ajout de travaux
    clearForm()
}

// Utilisée dans la fonction openModal pour stopper la propagation de la fermeture de la modale au clic

const stopPropagation = function (e) {
    e.stopPropagation()
}

const focusInModal = function(e) {
    e.preventDefault()
    let index = focusables.findIndex(f => f === modal.querySelector(":focus"))
    if (e.shiftKey === true) {
        index--
    } else {
    index++
    }
    if (index >= focusables.length) {
        index = 0
    }
    if ( index <0 ) {
        index = focusables.length -1
    }
    focusables[index].focus()
}

// Navigation au clavier dans la modale

window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key === "Tab" && modal !== null) {
        focusInModal(e)
    }
})

// Ouverture de la modale au clic sur le lien, forEach non utilisé pour l'instant (en prévision de la création de plusieurs boutons faisant apparaitre la modale)

document.querySelectorAll(".jsModal").forEach(a => {
    a.addEventListener ("click" , openModal)
})

// Fonctionnalité de changement de page de modale et retour arrière

const buttonAdWork = document.querySelector(".buttonAddWork")

buttonAdWork.addEventListener("click", function () {
    document.querySelector(".modalPageOne").style.display = "none"
    document.querySelector(".modalPageTwo").style.display = null
})

const backToPreviousPage = document.querySelector(".jsBackToPreviousPage")

backToPreviousPage.addEventListener("click", function () {
    document.querySelector(".modalPageOne").style.display = null
    document.querySelector(".modalPageTwo").style.display = "none"
    clearForm()
})


// Création des options de catégorie pour la liste déroulante d'ajout de travaux

const selectCategory = document.getElementById("category")

for (let i=0; i < category.length; i++) {
    let optionToSelect = document.createElement("option")
    optionToSelect.innerText = category[i].name
    optionToSelect.value = category[i].id
    selectCategory.appendChild(optionToSelect)
}

// Redirection vers l'input file masqué au clic sur le boutton stylisé "+ ajouter photo"

const jsRedirectInputFile = document.querySelector(".jsRedirectInputFile")

jsRedirectInputFile.addEventListener("click", function () {
    document.querySelector(".jsInputFile").click()
})

// Prévisualisation de l'image

const inputFile = document.querySelector(".jsInputFile")
const previewImage = document.getElementById('previewImage')
const modalErrorMessage = document.querySelector(".modalErrorMessage")

inputFile.addEventListener('change', function (e) {
    // Vérification de la validité du type de l'image, prévisualisation si true, puis lancement de la fonction qui vérifie que le formulaire est rempli ou non
    if (validFileType(e.target.files[0])) {
        previewImage.src = URL.createObjectURL(e.target.files[0])
        previewImage.style.display = "block"
        jsRedirectInputFile.style.visibility = "hidden"
        modalErrorMessage.style.display = "none"
        validateForm()
    // Sinon, réinitialisation de l'inputFile et apparition du message d'erreur correspondant
    } else {
        inputFile.value = ""
        // ????
        if (modalErrorMessage.style.display = "none") {
            modalErrorMessage.style.display = null
            modalErrorMessage.innerText = "Type de fichier invalide"
        }
    }
})

// Vérification de l'extension de l'image uploadée
        // Vérification du poids ??

const fileTypes = ["image/jpg" , "image/png"]


function validFileType(file) {
    
    for (let i = 0; i < fileTypes.length; i++) {
        if (file.type === fileTypes[i]) {
            return true
        }
    }
    return false
}

// Vérification des champs pour l'envoi du formulaire 

const inputTitleWork = document.getElementById("title")
const buttonSubmitWork = document.querySelector(".buttonSubmitWork")
const categorySelect = document.getElementById("category")

        // Fonction qui vérifie si les champs sont remplis et active le bouton d'envoi du formulaire

function validateForm() {
    let categorySelected = categorySelect.options[categorySelect.options.selectedIndex].value
    if (inputFile.value && categorySelected && inputTitleWork.value !== "" ) {
        buttonSubmitWork.disabled = false
        modalErrorMessage.style.display = "none"
    } else {
        modalErrorMessage.style.display = null
        modalErrorMessage.innerText = "Veuillez remplir tous les champs"
    }
}

        // Utilisation de la fonction de vérification pour chaque élément input au changement

const allInputsForm = [categorySelect , inputTitleWork]

allInputsForm.forEach(input => {
    input.addEventListener("change", function(e) {
    validateForm(e.target)
    })
})

// Fonction qui réinitialise le formulaire, utilisée à la fermeture de la modale et au changement de page de modale

const workUploadForm = document.querySelector(".workUploadForm")

function clearForm() {
    workUploadForm.reset()
    previewImage.style.display = "none"
    buttonSubmitWork.disabled = true
    jsRedirectInputFile.style.visibility = "visible"
    modalErrorMessage.style.display = "none"
}

// Envoi de nouveaux travaux

workUploadForm.addEventListener("submit", async function (event){
    event.preventDefault()
    const categorySelected = categorySelect.options[categorySelect.options.selectedIndex].value
    const token = window.localStorage.getItem("token")
    const formData = new FormData()
    formData.append("image", inputFile.files[0])
    formData.append("title", inputTitleWork.value)
    formData.append("category", categorySelected)
    fetch ("http://localhost:5678/api/works" , {
        method: "POST",
        headers: {Authorization:`Bearer ${token}`},
        body: formData
    })
    .then((response) => response.json())
    .then((data) => {
        displayGallery(data)
        document.querySelector(".jsCloseModal").click()
    })
})