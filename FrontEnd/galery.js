const works = await fetch("http://localhost:5678/api/works").then(works => works.json())
const category = await fetch ("http://localhost:5678/api/categories").then(category => category.json())
const DEFAULT_CATEGORY = "Tous";

function displayWorks(works) {
    for (let i=0; i < works.length; i++) {

        const figure = works[i]
        let galleries = document.querySelectorAll(".jsGallery")
        console.log(galleries)

        galleries.forEach(div => { 
        const workElement = document.createElement("figure")
        div.appendChild(workElement)

        const imageElement = document.createElement("img")
        imageElement.src = figure.imageUrl
        workElement.appendChild(imageElement)

        if (div.classList.contains("gallery")) {
            const captionElement = document.createElement("figcaption")
            captionElement.innerText = figure.title
            workElement.appendChild(captionElement)
        } else {
            const deleteButton = document.createElement("button")
            const trash = document.createElement("i")
            trash.classList.add("fa-solid", "fa-trash-can", "fa-xs")
            workElement.appendChild(deleteButton)
            deleteButton.appendChild(trash)
        }
        })
    }
}

displayWorks(works)

function createButton(text, divFilter) {
    const buttonDefault = document.createElement("button");
    buttonDefault.innerText = text;
    buttonDefault.className = "filterStyle";
    divFilter.appendChild(buttonDefault);

    buttonDefault.addEventListener("click", function (event) {
        const btnClicked = event.target;
        let filterWorks = works;
        if (DEFAULT_CATEGORY !== text) {
            filterWorks = works.filter(function (works) {
                return works.category.name === text
            })
        }

        document.querySelector(".gallery").innerHTML = ""
        displayWorks(filterWorks);
        document.querySelectorAll('.filterStyle').forEach((btn) => {
            btn.classList.remove('active');
        });
        btnClicked.classList.add('active');
    });
}

function displayFilters(category) {

    const divFilter =  document.querySelector(".filters")
    createButton(DEFAULT_CATEGORY, divFilter);
    
    for (let i=0; i < category.length; i++) {

        const categoryElement = category[i]
        console.log(category[i])

        createButton(categoryElement.name, divFilter);
    }
}

displayFilters(category)

