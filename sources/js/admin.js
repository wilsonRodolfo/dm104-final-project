/* JavaScript */

var Index = {

	init: function () {
		Index.setForm();
		Index.listClients();
	},

	setForm: function () {
		var form = document.getElementById('formeditar');
		if (form) {
			form.style.display = "none";

			form.onsubmit = function () {
				Index.saveClient(form);

				form.style.display = "none";
				return false; //to prevent the form submition
			};
		}
	},

	saveClient: function (form) {
		var client = {};
		client.nome = form.inputNome.value;
		client.telefone = form.inputTel.value;
		client.email = form.inputEmail3.value;
		client.senha = form.inputPassword3.value;

		if (ClienteDAO.save(client) == ClienteDAO.NEW) {
			TableController.addItem(client, Index.edit, Index.delete);
		}
		else {
			TableController.clearList();
			Index.listClients();
		}
	},

	setTable: function () {
		var table = document.getElementById('tb-client');
		TableController.setTable(table);
	},

	listClients: function () {
		Index.setTable();
		var clientList = ClienteDAO.retrieve();
		if (clientList && clientList.length) {
			TableController.addList(clientList, Index.edit, Index.delete);
		}
	},

	edit: function (email) {
		var cliente = ClienteDAO.get(email);
		if (cliente) {
			var form = document.getElementById('formeditar');
			form.style.display = "inline";
			form.inputNome.value = cliente.nome;
			form.inputTel.value = cliente.telefone;
			form.inputEmail3.value = cliente.email;
			form.inputPassword3.value = cliente.senha;
		}
	},

	delete: function (email, element) {
		if (confirm("Are you sure about to delete " + email)) {
			var cliente = ClienteDAO.get(email);
			if (cliente) {
				if (ClienteDAO.delete(email)) {
					var row = element.parentNode.parentNode;
					row.parentNode.removeChild(row);
				}
			}
		}
	}
};

//initialization
ClienteDAO.unserializeAndParse();
Index.init();