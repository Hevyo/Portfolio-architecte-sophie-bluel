let inputMail = document.getElementById("mail")
let inputPassword = document.getElementById("password")

// Fonction qui vérifie l'existence de l'utilisateur puis le connecte ou affiche un message d'erreur 
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
        // Enregistrement du token dans le localStorage puis redirection en page d'accueil en cas de bonne connexion
        if (data.userId) {
            window.localStorage.setItem("token" , data.token)
            window.location.href = "index.html"
        // Si connexion échouée, lancement de la fonction affichant des messages d'erreur
        } else {
            verifierEmail(inputMail)
        }
    })
})

// Fonction qui vérifie le mail et informe l'utilisateur d'un mauvais format de mail ou du fait que l'utilisateur soit inconnu dans le cas contraire
function verifierEmail(inputMail) {
	let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    let errorMessage = document.querySelector(".errorMessage")

    // Création d'une balise "p" affichant un message d'erreur seulement si elle n'existe pas déjà
    if (errorMessage === null ) {
        errorMessage = document.createElement("p")
        errorMessage.classList.add("errorMessage")
        loginSection.appendChild(errorMessage)
    }

    // Test du mail et affichage du bon message d'erreur
	if (emailRegExp.test(inputMail.value)) {
        errorMessage.innerText = "Utilisateur inconnu"
	} else {
        errorMessage.innerText = "E-mail non valide"
	}
}