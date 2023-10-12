const category = await fetch ("http://localhost:5678/api/categories").then(category => category.json())

let modal = null
const focusableSelector = "input, button"
let focusables = []
let previouslyFocusedElement = null

const openModal = function (e) {
    e.preventDefault()
    modal = document.querySelector(e.currentTarget.getAttribute("href"))
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
    previouslyFocusedElement = document.querySelector(":focus")
    modal.style.display = null
    focusables[0].focus()
    modal.removeAttribute("aria-hidden")
    modal.setAttribute("aria-modal", "true")
    modal.addEventListener("click", closeModal)
    modal.querySelectorAll(".jsCloseModal").forEach (x => { x.addEventListener("click", closeModal)})
    modal.querySelector(".jsModalStop").addEventListener("click", stopPropagation)
}

const closeModal = function (e) {
    if (modal === null) return
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus()
    e.preventDefault()
    window.setTimeout(function () {
        modal.style.display = "none"
        modal = null
    }, 500)
    modal.setAttribute("aria-hidden" , true)
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click", closeModal)
    modal.querySelectorAll(".jsCloseModal").forEach (x => { x.removeEventListener("click", closeModal)})
    modal.querySelectorAll(".jsCloseModal").forEach (x => { x.removeEventListener("click", stopPropagation)})
    clearForm()
}

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

// Ouverture de la modale au clic sur le lien, forEach non utilisé pour l'instant (en prévision de la création de plusieurs boutons faisant apparaitre la modale)

document.querySelectorAll(".jsModal").forEach(a => {
    a.addEventListener ("click" , openModal)
})

// Navigation au clavier dans la modale

window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key === "Tab" && modal !== null) {
        focusInModal(e)
    }
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
    optionToSelect.value , optionToSelect.innerText = category[i].name
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
    console.log(e.target.files[0])
    if (validFileType(e.target.files[0])) {
        previewImage.src = URL.createObjectURL(e.target.files[0])
        previewImage.style.display = "block"
        jsRedirectInputFile.style.visibility = "hidden"
        modalErrorMessage.style.display = "none"
    } else {
        inputFile.value = ""
        console.log(inputFile.value)
        if (modalErrorMessage.style.display = "none") {
            modalErrorMessage.style.display = null
            modalErrorMessage.innerText = "Type de fichier invalide"
        }
    }
})

// Vérification de l'extension de l'image uploadée

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
const workUploadForm = document.querySelector(".workUploadForm")

        // Fonction qui vérifie si les champs sont remplis et active le bouton d'envoi du formulaire

function validateForm() {
    let categorySelected = workUploadForm.category.options[workUploadForm.category.options.selectedIndex].value;
    console.log(inputFile.value + " " +  categorySelected + " " + inputTitleWork.value)
    if (inputFile.value && categorySelected && inputTitleWork.value !== "" ) {
        buttonSubmitWork.disabled = false
        modalErrorMessage.style.display = "none"
    } else {
        modalErrorMessage.style.display = null
        modalErrorMessage.innerText = "Veuillez remplir tous les champs"
    }
}

        // Utilisation de la fonction de vérification pour chaque élément input au changement

const allInputsForm = [inputFile , workUploadForm , inputTitleWork]
console.log(allInputsForm)

allInputsForm.forEach(input => {
    input.addEventListener("change", function(e) {
    validateForm(e.target)
    console.log(e.target)
    })
})

// Fonction qui réinitialise le formulaire, utilisée à la fermeture de la modale et au changement de page de modale

function clearForm() {
    workUploadForm.reset()
    previewImage.style.display = "none"
    buttonSubmitWork.disabled = true
    jsRedirectInputFile.style.visibility = "visible"
}

