const works = await fetch("http://localhost:5678/api/works").then(works => works.json())
const category = await fetch ("http://localhost:5678/api/categories").then(category => category.json())

function displayWorks(works) {
    for (let i=0; i < works.length; i++) {

        const figure = works[i]
        const gallery = document.querySelector(".gallery")
        const workElement = document.createElement("figure")

        const imageElement = document.createElement("img")
        imageElement.src = figure.imageUrl

        const captionElement = document.createElement("figcaption")
        captionElement.innerText = figure.title

        gallery.appendChild(workElement)
        workElement.appendChild(imageElement)
        workElement.appendChild(captionElement)
    }
}

displayWorks(works)

function displayFilters(category) {

    const divFilter =  document.querySelector(".filters")
    const buttonDefault = document.createElement("button")
    buttonDefault.innerText = "Tous"
    buttonDefault.className = "filterStyle"
    divFilter.appendChild(buttonDefault)

    buttonDefault.addEventListener("click", function (){
        document.querySelector(".gallery").innerHTML = ""
        displayWorks(works)
        })
    
    for (let i=0; i < category.length; i++) {

        const categoryElement = category[i]
        console.log(category[i])

        const buttonFilter = document.createElement("button")
        buttonFilter.innerText = categoryElement.name
        divFilter.appendChild(buttonFilter)
        buttonFilter.className = "filterStyle"

        buttonFilter.addEventListener("click", function (){
            const filteredWorks = works.filter(function (works) {
                return works.category.name === category[i].name
            })
        document.querySelector(".gallery").innerHTML = ""
        displayWorks(filteredWorks)
        })
    }
}

displayFilters(category)

