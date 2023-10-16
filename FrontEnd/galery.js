const works = await fetch("http://localhost:5678/api/works").then(works => works.json())
const category = await fetch ("http://localhost:5678/api/categories").then(category => category.json())
const DEFAULT_CATEGORY = "Tous";

const workElements = []
let imgElement = []

function displayWorks(works) {
    for (let i=0; i < works.length; i++) {

        const figure = works[i]
        displayGallery(figure)
        console.log(workElements)
    }
}

export function displayGallery(figure) {
    let galleries = document.querySelectorAll(".jsGallery")

    imgElement = []

    galleries.forEach(div => { 
        const workElement = document.createElement("figure")
        imgElement.push(workElement)
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
            deleteButton.classList.add("jsDeleteButton")
            deleteButton.setAttribute("data-id", figure.id)
            const trash = document.createElement("i")
            trash.classList.add("fa-solid", "fa-trash-can", "fa-xs")
            workElement.appendChild(deleteButton)
            deleteButton.appendChild(trash)

            deleteButton.addEventListener("click", function(event) {
                const target = event.currentTarget
                const workId = target.getAttribute("data-id")
                console.log(workId)
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
                console.log(workElements)
            })
        }
    })
    workElements[figure.id] = imgElement
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

        createButton(categoryElement.name, divFilter);
    }
}

displayFilters(category)

