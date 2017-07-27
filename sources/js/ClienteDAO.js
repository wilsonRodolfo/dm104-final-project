/* JavaScript Document */
	
var ClienteDAO = {

	DB_KEY: "clientes",
	NEW: 1,
	UPDATE: 2,
    ERRO: -1,

	list: [],

	save: function (cliente) {
		var list = ClienteDAO.list, index = ClienteDAO.getIndex(cliente);
        let retorno = ClienteDAO.ERRO;

		if (index > -1) {
			list[index] = cliente;
			console.log("Cliente já existe... Atualizando");
			
            retorno = ClienteDAO.UPDATE;
		}
		else {
			list.push(cliente);
			retorno = ClienteDAO.NEW;
		}

		ClienteDAO.serializeAndSave();

		return retorno;
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
