document.addEventListener('DOMContentLoaded', () => {
    let userLogado = JSON.parse(localStorage.getItem('userLogado'));

    if (userLogado) {
        // Exibe informações do usuário logado
        document.getElementById('userInfo').innerHTML = `
            <p>Nome: ${userLogado.nome}</p>
            <p>Idade: ${userLogado.idade}</p>
            <p>Gênero: ${userLogado.genero}</p>
            <p>Email: ${userLogado.user}</p>
            <p>Tel: ${userLogado.tel}</p>
        `;
    } else {
        alert('Nenhum usuário logado encontrado.');
        window.location.href = '/login.html';
        return;
    }

    // Função para alternar visibilidade da senha
    function togglePassword(inputId, toggleId) {
        let input = document.getElementById(inputId);
        let toggle = document.getElementById(toggleId);

        if (input.type === 'password') {
            input.type = 'text';
            toggle.classList.remove('fa-eye');
            toggle.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            toggle.classList.remove('fa-eye-slash');
            toggle.classList.add('fa-eye');
        }
    }

    // Adiciona evento ao ícone para alternar a senha
    document.getElementById('toggleSenhaAtual').addEventListener('click', () => {
        togglePassword('confirmSenha', 'toggleSenhaAtual');
    });

    // Função para excluir conta
    function excluirConta() {
        let confirmSenha = document.getElementById('confirmSenha').value;
        let msgError = document.getElementById('msgError');
        let msgSuccess = document.getElementById('msgSuccess');

        msgError.style.display = 'none';
        msgSuccess.style.display = 'none';
        msgError.innerText = '';
        msgSuccess.innerText = '';

        if (confirmSenha === userLogado.senha) {
            let listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];
            let userIndex = listaUser.findIndex(item => item.userCad === userLogado.user && item.senhaCad === userLogado.senha);

            if (userIndex !== -1) {
                listaUser.splice(userIndex, 1);
                localStorage.setItem('listaUser', JSON.stringify(listaUser));

                localStorage.removeItem('userLogado');
                localStorage.removeItem('token');
                msgSuccess.innerText = 'Conta excluída com sucesso.';
                msgSuccess.style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/index.html';
                }, 3000); 
            } else {
                msgError.innerText = 'Erro ao excluir a conta. Usuário não encontrado.';
                msgError.style.display = 'block';
            }
        } else {
            msgError.innerText = 'Senha incorreta. Por favor, tente novamente.';
            msgError.style.display = 'block';
        }
    }

    document.querySelector('#btnExcluir').addEventListener('click', excluirConta);
});