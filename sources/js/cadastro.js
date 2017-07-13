/* JavaScript Document */

var cadastro = {
    init: function () {
		cadastro.submitCadastro();
	},

    submitCadastro: function () {
        var formCadastro = document.getElementById('formcadastrar');
        if (formCadastro) {
            formCadastro.onsubmit = function () {
                let cliente = {};
                cliente.nome = formCadastro.inputNome.value;
                cliente.telefone = formCadastro.inputTel.value;
                cliente.email = formCadastro.inputEmail3.value;
                cliente.senha = formCadastro.inputPassword3.value;
                ClienteDAO.save(cliente);
                window.location.href = "login.html";
                return false; //to prevent the formCadastro submition
            };
        }
    }
};

cadastro.init();