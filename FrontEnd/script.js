const mainTitle = document.querySelector("h1")

mainTitle.addEventListener("click", function () {
    window.location.href = "index.html"
})

if (window.location.hash ) {
    const btn = window.location.hash
    document.querySelector("#btn" + btn.charAt(1).toUpperCase() + btn.slice(2)).classList.add("btnNavHeaderActive")
}

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

if (window.localStorage.getItem("token")) {
    const editionMode = document.getElementById("editionMode")
    editionMode.classList.remove("displayNone")

    const editionButton = document.getElementById("editionButton")
    editionButton.classList.remove("displayNone")

    const projectTitle = document.querySelector(".projectTitle")
    projectTitle.classList.add("marginProjectTitle")

    const filters = document.querySelector(".filters")
    filters.classList.add("displayNone")

    loginButton.innerText = "Logout"

    loginButton.addEventListener("click", function (){
        window.localStorage.removeItem("token")
    })
}