function togglePasswordVisibility(inputId, toggleIconId) {
    const input = document.getElementById(inputId);
    const toggleIcon = document.getElementById(toggleIconId);

    if (input.type === 'password') {
        input.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Quando o DOM for carregado
document.addEventListener("DOMContentLoaded", function() {
    const redefinirSenhaBtn = document.querySelector("#redefinirSenha");
    if (redefinirSenhaBtn) {
        redefinirSenhaBtn.addEventListener("click", redefinirSenha);
    }
});

function redefinirSenha() {
    removeErrorMessages();

    const tempSenha = document.querySelector('#tempSenha').value;
    const newSenha = document.querySelector('#newSenha').value;
    const confirmSenha = document.querySelector('#confirmSenha').value;

    if (tempSenha.length !== 6 || isNaN(tempSenha)) {
        displayError("O código de verificação deve ter 6 dígitos.", "#tempSenha");
        return;
    }

    const codigoVerificacao = localStorage.getItem('codigoVerificacao');
    if (tempSenha !== codigoVerificacao) {
        displayError("O código de verificação inserido está incorreto.", "#tempSenha");
        return;
    }

    if (newSenha.length < 6) {
        displayError("A nova senha deve ter pelo menos 6 caracteres.", "#newSenha");
        return;
    }

    if (newSenha !== confirmSenha) {
        displayError("As senhas não coincidem.", "#confirmSenha");
        return;
    }

    const emailRedefinicao = localStorage.getItem('emailRedefinicao');
    const listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];

    listaUser.forEach((item, index) => {
        if (item.userCad === emailRedefinicao) {
            listaUser[index].senhaCad = newSenha;
        }
    });

    localStorage.setItem('listaUser', JSON.stringify(listaUser));

    alert("Senha redefinida com sucesso!");
    window.location.href = '/index.html';
}

function displayError(message, elementId) {
    const errorMsg = document.createElement('div');
    errorMsg.textContent = message;
    errorMsg.style.color = "red";
    errorMsg.style.fontSize = "14px";
    errorMsg.id = "error-" + elementId.substring(1);

    const element = document.querySelector(elementId);
    element.parentElement.insertBefore(errorMsg, element.nextSibling);
}

function removeErrorMessages() {
    const errorMessages = document.querySelectorAll("[id^='error-']");
    errorMessages.forEach(errorMsg => errorMsg.remove());
}