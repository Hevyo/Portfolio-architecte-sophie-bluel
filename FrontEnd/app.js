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
    modal.querySelector(".jsCloseModal").addEventListener("click", closeModal)
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
    modal.querySelector(".jsCloseModal").removeEventListener("click", closeModal)
    modal.querySelector(".jsCloseModal").removeEventListener("click", stopPropagation)
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

// Non utilisé pour l'instant, en prévision de la création de plusieurs boutons faisant apparaitre la modale

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

// Remplacement du contenu de la modale pour l'ajout de travaux

const buttonAdWork = document.querySelector(".buttonAddWork")

buttonAdWork.addEventListener("click", function () {
    document.querySelector(".modalPageOne").style.display = "none"
    document.querySelector(".modalPageTwo").style.display = null
})


// Création des options de catégorie pour la liste déroulante d'ajout de travaux

const selectCategory = document.getElementById("category")

for (let i=0; i < category.length; i++) {
    let optionToSelect = document.createElement("option")
    optionToSelect.value , optionToSelect.innerText = category[i].name
    selectCategory.appendChild(optionToSelect)
}
