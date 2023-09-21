let loginButton = document.getElementById("login")

loginButton.addEventListener("click", function () {
    const main = document.querySelector("main")
    main.innerHTML = ""
    const loginSection = document.createElement("section")
    loginSection.id = "loginSection"
    main.appendChild(loginSection)
    const loginTitle = document.createElement("h2")
    loginTitle.innerText = "Log In"
    loginSection.appendChild(loginTitle)
    const loginForm = document.createElement("form")
    loginForm.id = "loginForm"
    loginForm.setAttribute("action", "http://localhost:5678/api/users/login")
    loginForm.setAttribute("method", "post")
    loginSection.appendChild(loginForm)
    const mailFieldset = document.createElement("fieldset")
    mailFieldset.classList.add("loginFieldset")
    loginForm.appendChild(mailFieldset)
    const labelMail = document.createElement("label")
    labelMail.setAttribute("for", "mail")
    labelMail.innerText = "E-mail"
    mailFieldset.appendChild(labelMail)
    const inputMail = document.createElement("input")
    inputMail.setAttribute("type", "mail")
    inputMail.name = "mail"
    inputMail.id = "mail"
    inputMail.required = true
    mailFieldset.appendChild(inputMail)
    const passwordFieldset = document.createElement("fieldset")
    passwordFieldset.classList.add("loginFieldset")
    loginForm.appendChild(passwordFieldset)
    const labelPassword = document.createElement("label")
    labelPassword.setAttribute("for", "password")
    labelPassword.innerText = "Mot de passe"
    passwordFieldset.appendChild(labelPassword)
    const inputPassword = document.createElement("input")
    inputPassword.type = "password"
    inputPassword.name = "password"
    inputPassword.id = "password"
    inputPassword.required = true
    passwordFieldset.appendChild(inputPassword)
    const loginSubmit = document.createElement("input")
    loginSubmit.type = "submit"
    loginSubmit.value = "Se connecter"
    loginForm.appendChild(loginSubmit)
    const forgotPassword = document.createElement("a")
    forgotPassword.href = ""
    forgotPassword.innerText = "Mot de passe oublié"
    loginSection.appendChild(forgotPassword)

    const footer = document.querySelector("footer")
    footer.classList.add("loginFooter")
})

let btnNavHeader = document.querySelectorAll(".btnNavHeader")

btnNavHeader.addEventListener("click", function (event) {
    btnNavHeaderClicked = event.target
    btnNavHeader.forEach((btn) => {
        btn.classList.remove('active');
    });
    btnNavHeaderClicked.classList.add("active")
})


