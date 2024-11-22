document.addEventListener('DOMContentLoaded', () => {
  let userLogado = JSON.parse(localStorage.getItem('userLogado'));

  if (!userLogado) {
      alert('Nenhum usuário logado encontrado.');
      window.location.href = '/home.html';
      return;
  }

  document.getElementById('nome').value = userLogado.nome;
  document.getElementById('idade').value = userLogado.idade;
  document.getElementById('genero').value = userLogado.genero;
  document.getElementById('usuario').value = userLogado.user;
  document.getElementById('tel').value = userLogado.tel;

  document.getElementById('toggleSenhaAtual').addEventListener('click', () => togglePassword('senhaAtual', 'toggleSenhaAtual'));
  document.getElementById('toggleNovaSenha').addEventListener('click', () => togglePassword('novaSenha', 'toggleNovaSenha'));
  document.getElementById('toggleConfirmNovaSenha').addEventListener('click', () => togglePassword('confirmNovaSenha', 'toggleConfirmNovaSenha'));


  document.querySelector('#btnAlterarCadastro').addEventListener('click', alterarCadastro);


  function alterarCadastro() {
      let nome = document.getElementById('nome').value;
      let idade = document.getElementById('idade').value;
      let genero = document.getElementById('genero').value;
      let usuario = document.getElementById('usuario').value;
      let tel = document.getElementById('tel').value;
      let senhaAtual = document.getElementById('senhaAtual').value;
      let novaSenha = document.getElementById('novaSenha').value;
      let confirmNovaSenha = document.getElementById('confirmNovaSenha').value;
      let msgError = document.getElementById('msgError');
      let msgSuccess = document.getElementById('msgSuccess');

      msgError.style.color = 'red';
      msgSuccess.style.color = 'green';


      if (nome.length <= 2) {
          msgError.innerText = 'O nome deve ter no mínimo 3 caracteres.';
          msgError.style.display = 'block';
          return;
      }

      if (genero === "") {
          msgError.innerText = 'Por favor, selecione um gênero.';
          msgError.style.display = 'block';
          return;
      }

      if (idade.length <= 1) {
          msgError.innerText = 'A idade deve ter no mínimo 2 dígitos.';
          msgError.style.display = 'block';
          return;
      }

      if (senhaAtual !== userLogado.senha) {
          msgError.innerText = 'A senha atual está incorreta.';
          msgError.style.display = 'block';
          return;
      }

      if (novaSenha && novaSenha.length < 6) {
          msgError.innerText = 'A nova senha deve ter no mínimo 6 caracteres.';
          msgError.style.display = 'block';
          return;
      }

      if (novaSenha && novaSenha !== confirmNovaSenha) {
          msgError.innerText = 'A nova senha e a confirmação não coincidem.';
          msgError.style.display = 'block';
          return;
      }

      if (!isValidEmail(usuario)) {
          msgError.innerText = 'O e-mail deve estar no formato correto (ex: aaa@aa.com).';
          msgError.style.display = 'block';
          return;
      }

      if (tel.length < 8) {
          msgError.innerText = 'O telefone deve ter no mínimo 8 números.';
          msgError.style.display = 'block';
          return;
      }

      let listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];
      let userIndex = listaUser.findIndex(item => item.userCad === userLogado.user);

      if (userIndex !== -1) {
          listaUser[userIndex].nomeCad = nome;
          listaUser[userIndex].idadeCad = idade;
          listaUser[userIndex].generoCad = genero;
          listaUser[userIndex].userCad = usuario;
          listaUser[userIndex].telCad = tel;

          if (novaSenha) {
              listaUser[userIndex].senhaCad = novaSenha;
              userLogado.senha = novaSenha;
          }

          localStorage.setItem('listaUser', JSON.stringify(listaUser));
          localStorage.setItem('userLogado', JSON.stringify(userLogado));

          msgSuccess.innerText = 'Cadastro alterado com sucesso!';
          msgSuccess.style.display = 'block';
          msgError.style.display = 'none';

          setTimeout(() => window.location.href = '/home.html', 3000);
      } else {
          msgError.innerText = 'Erro ao alterar o cadastro. Usuário não encontrado.';
          msgError.style.display = 'block';
      }
  }

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

  function isValidEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
  }
});
