/* JavaScript Document */

var ClienteDAO = {

	DB_KEY: "clientes",
	NEW: 1,
	UPDATE: 2,

	list: [],

	init: function () {
		ClienteDAO.submitCadastro();
		ClienteDAO.submitLogin();
	},

	submitCadastro: function () {
		var formCadastro = document.getElementById('formcadastrar');
		if (formCadastro) {
			formCadastro.onsubmit = function () {
				ClienteDAO.unserializeAndParse();
				console.log(ClienteDAO.list);
				let cliente = {};
				cliente.nome = formCadastro.inputNome.value;
				cliente.telefone = formCadastro.inputTel.value;
				cliente.email = formCadastro.inputEmail3.value;
				cliente.senha = formCadastro.inputPassword3.value;
				ClienteDAO.save(cliente);
				return false; //to prevent the formCadastro submition
			};
		}
	},

	submitLogin: function () {
		var formLogin = document.getElementById('formlogin');
		if (formLogin) {
			formLogin.onsubmit = function () {
				ClienteDAO.unserializeAndParse();
				console.log("formLogin.inputEmail.value " + formLogin.inputEmail.value);
				let cliente = ClienteDAO.get(formLogin.inputEmail.value);
				if (cliente) {
					if (cliente.senha == formLogin.inputPassword.value)
						window.location.href = "admin.html";
					else
						window.alert("Senha incorreta!");

				} else
					window.alert("Email incorreto!");
				return false; //to prevent the formLogin submition
			};
		}
	},

	save: function (cliente) {
		var list = ClienteDAO.list, index = ClienteDAO.getIndex(cliente);

		if (index > -1) {
			list[index] = cliente;
			console.log("Cliente já existe... Atualizando");
			return ClienteDAO.UPDATE;
		}
		else {
			list.push(cliente);
		}

		ClienteDAO.serializeAndSave();

		return ClienteDAO.NEW;
	},

	retrieve: function () {
		var list = ClienteDAO.list;
		if (list && list.length > 0) {
			return list;
		}
		return null;
	},

	get: function (email) {
		var list = ClienteDAO.list,
			index = ClienteDAO.getIndex({ 'email': email });

		if (index > -1) {
			var cliente = list[index];
			return cliente;
		}

		return null;
	},

	getIndex: function (cliente) {
		var list = ClienteDAO.list,
			item = {};

		for (var i = 0; i < list.length; i++) {
			item = list[i];
			if (item.email == cliente.email) {
				return i;
			}
		}

		return -1;
	},

	delete: function (email) {
		var list = ClienteDAO.list,
			index = ClienteDAO.getIndex({ 'email': email });

		if (index > -1) {
			//https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/splice
			list.splice(index, 1);
			return true;
		}

		return false;
	},

	serializeAndSave: function () {
		var list = ClienteDAO.list;
		if (list && list.length > 0) {
			var json = JSON.stringify(ClienteDAO.list);
			window.localStorage.setItem(ClienteDAO.DB_KEY, json);
		}
	},

	unserializeAndParse: function () {
		var json = window.localStorage.getItem(ClienteDAO.DB_KEY);
		if (json) {
			ClienteDAO.list = JSON.parse(json);
		}
		else {
			ClienteDAO.list = [];
		}
	}

};

ClienteDAO.init();
