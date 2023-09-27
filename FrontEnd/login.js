let loginButton = document.getElementById("login")

loginButton.addEventListener("click", function () {
    const main = document.querySelector("main")
    main.innerHTML = ""
    window.location.href = "login.html"

    loginForm.addEventListener("submit", async function (event){
        event.preventDefault()
        fetch ("http://localhost:5678/api/users/login" , {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                "email" : inputMail.value,
                "password" : inputPassword.value
            })
        })
        .then (response => {console.log(response) ; return response.json()}) 
        .then((data) => { console.log(data)
            if (data.userId) {
                window.localStorage.setItem("token" , data.token)
                window.location.href = "index.html"
            } else {
                verifierEmail(inputMail)
            }
        })
    })
})

function verifierEmail(inputMail) {
	let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    let errorMessage = document.querySelector(".errorMessage")
    if (errorMessage === null ) {
        // if (!errorMessage) ou inverse if (errorMessage)
        errorMessage = document.createElement("p")
        errorMessage.classList.add("errorMessage")
        loginSection.appendChild(errorMessage)
    }
	if (emailRegExp.test(inputMail.value)) {
        errorMessage.innerText = "Utilisateur inconnu"
	} else {
        errorMessage.innerText = "E-mail non valide"
	}
}



