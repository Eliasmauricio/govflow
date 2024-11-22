const nomeFixo = "Grupo02"; 
let senhaAtual = "Senac123"; 

function entrar() {
    const nomeInput = document.querySelector("#usuario").value;
    const senhaInput = document.querySelector("#senha").value;
    const divCodigo = document.querySelector("#msgError");

    if (nomeInput === nomeFixo && senhaInput === senhaAtual) {
       
        localStorage.setItem("adminNome", nomeFixo);
        localStorage.setItem("isAdmin", true);  

        divCodigo.setAttribute("style", "color: green; font-weight: bold;");
        divCodigo.innerHTML = "Login bem-sucedido! Redirecionando...";

        setTimeout(() => {
            window.location.href = "/HomeAdm.html"; 
        }, 2000);
    } else {
       
        let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');
        let usuarioValido = listaUser.find(user => user.userCad === nomeInput && user.senhaCad === senhaInput);

        if (usuarioValido) {
           
            localStorage.setItem("usuarioNome", nomeInput);
            localStorage.setItem("isAdmin", false);  

            divCodigo.setAttribute("style", "color: green; font-weight: bold;");
            divCodigo.innerHTML = "Login bem-sucedido! Redirecionando...";

            setTimeout(() => {
                window.location.href = "/home.html"; 
            }, 2000);
        } else {
           
            divCodigo.setAttribute("style", "color: red; font-weight: bold;");
            divCodigo.innerHTML = "Nome ou senha incorretos!";
        }
    }
}