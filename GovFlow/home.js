const userLogado = JSON.parse(localStorage.getItem('userLogado'));
document.getElementById('logado').innerHTML =` ${userLogado.nome}`;

document.querySelector('#btnExcluir').addEventListener('click', function() {
    window.location.href ='/excluir.html';
});

function sair() {
    localStorage.removeItem("userLogado");
    window.location.href = "/index.html"; 
}

