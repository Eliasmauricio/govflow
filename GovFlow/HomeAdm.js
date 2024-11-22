window.onload = function() {
    const adminNome = localStorage.getItem("adminNome");

    if (adminNome) {
        document.getElementById("logado").textContent = adminNome;
    } else {
        document.getElementById("logado").textContent = "Administrador não encontrado";
    }
};

function sair() {
    localStorage.removeItem("adminNome");
    window.location.href = "/index.html"; 
}