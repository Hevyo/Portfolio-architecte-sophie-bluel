const btnNavHeader = document.querySelectorAll(".btnNavHeader")

btnNavHeader.forEach((btn) => {
    btn.addEventListener("click", function (event) {
        const btnNavHeaderClicked = event.target
        btnNavHeader.forEach((btn) => {
            btn.classList.remove("btnNavHeaderActive");
        })
        btnNavHeaderClicked.classList.add("btnNavHeaderActive")
    })
})


// ajouter une redirection href pour les boutons nav ?? index.html#contact