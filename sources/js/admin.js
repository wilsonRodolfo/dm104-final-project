/* JavaScript */

var Index = {

	init: function() {
		Index.setForm();
		Index.listClients();
	},

	setForm: function() {
		var form = document.getElementById('fb-subscriber');
		if(form) {
			form.onsubmit = function() {
				Index.saveSubscriber(form);
				return false; //to prevent the form submition
			};
		}
	},

	saveClient: function(form) {
		var client = {};
		client.name  = form.name.value;
		client.email = form.email.value;
		
		if(ClienteDAO.save(client) == ClienteDAO.NEW) {
			TableController.addItem(client, Index.edit, Index.delete);
		}
		else {
			TableController.clearList();
			Index.listClients();
		}

		form.name.value = form.email.value = "";
	},

	setTable: function() {
		var table = document.getElementById('tb-client');
		TableController.setTable(table);
	},

	listClients: function() {
		Index.setTable();
		var clientList = ClienteDAO.retrieve();
		if (clientList && clientList.length) {
			TableController.addList(clientList, Index.edit, Index.delete);
		}
	},

	edit: function(email) {
		if(confirm("Do you want edit " + email)) {
			var subscriber = SubscriberDAO.get(email);
			if (subscriber) {
				var form = document.getElementById('fb-subscriber');
				form.name.value  = subscriber.name;
				form.email.value = subscriber.email;
			}
		}
	},

	delete: function(email, element) {
		if(confirm("Are you sure about to delete " + email)) {
			var subscriber = SubscriberDAO.get(email);
			if (subscriber) {
				if(SubscriberDAO.delete(email)) {
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