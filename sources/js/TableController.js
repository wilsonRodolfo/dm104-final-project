/* JavaScript Document */

var TableController = {

	table: null,

	setTable: function (table) {
		this.table = table;
	},

	addItem: function (item, editCallback, deleteCallback) {
		if (item) {
			var tbody = TableController.table.tBodies[0],
				row = TableController.createNewRow(),
				index = 0;

			row.cells[index++].innerHTML = item.nome;
			row.cells[index++].innerHTML = item.telefone;
			row.cells[index++].innerHTML = item.email;
			TableController.createActions(row.cells[index++], item, editCallback, deleteCallback);

			tbody.appendChild(row);
		}
	},

	addItemCarrinho: function (item, removeCallback) {
		if (item) {
			var tbody = TableController.table.tBodies[0],
				row = TableController.createNewRowCarrinho(),
				index = 0;

			var img = document.createElement('img');
			img.setAttribute("src", item.caminhoImg);
			img.setAttribute("class", "img-responsive");
			//img.setAttribute("style", "width:100%");
			img.setAttribute("height", "100");
			img.setAttribute("width", "200");
			img.setAttribute("alt", "Image");

			//row.cells[index].innerHTML = item.caminhoImg;
			row.cells[index++].appendChild(img);
			row.cells[index++].innerHTML = item.descricao;
			row.cells[index++].innerHTML = item.preco;
			row.cells[index++].innerHTML = item.quantidade;
			TableController.createActionsCarrinho(row.cells[index++], item, removeCallback);

			tbody.appendChild(row);
		}
	},

	addList: function (list, editCallback, deleteCallback) {
		if (list && list.length > 0) {
			for (var i = 0, leng = list.length; i < leng; i++) {
				TableController.addItem(list[i], editCallback, deleteCallback);
			}
		}
	},

	addListCarrinho: function (list, removeCallback) {
		if (list && list.length > 0) {
			for (var i = 0, leng = list.length; i < leng; i++) {
				TableController.addItemCarrinho(list[i], removeCallback);
			}
		}
	},

	clearList: function () {
		TableController.table.tBodies[0].innerHTML = "";
	},

	createNewRow: function () {
		var row = document.createElement('tr');
		row.appendChild(document.createElement('td'));
		row.appendChild(document.createElement('td'));
		row.appendChild(document.createElement('td'));
		row.appendChild(document.createElement('td'));
		return row;
	},

	createNewRowCarrinho: function () {
		var row = document.createElement('tr');
		row.appendChild(document.createElement('td'));
		row.appendChild(document.createElement('td'));
		row.appendChild(document.createElement('td'));
		row.appendChild(document.createElement('td'));
		row.appendChild(document.createElement('td'));
		return row;
	},

	createActions: function (cell, item, editCallback, deleteCallback) {
		var editElement = document.createElement("span"),
			deleteElement = document.createElement("span");

		editElement.innerHTML = "Editar";
		editElement.setAttribute("data-email", item.email);
		editElement.className = "btn btn-success";

		deleteElement.innerHTML = "Deletar";
		deleteElement.setAttribute("data-email", item.email);
		deleteElement.className = "btn btn-danger";

		if (editCallback) {
			editElement.onclick = function () {
				var email = editElement.getAttribute('data-email');
				editCallback(email);
			};
		}

		if (deleteCallback) {
			deleteElement.onclick = function () {
				var email = deleteElement.getAttribute('data-email');
				deleteCallback(email, deleteElement);
			};
		}

		cell.appendChild(editElement);
		cell.appendChild(deleteElement);
	},

	createActionsCarrinho: function (cell, item, removeCallback) {
		
		var removeElement = document.createElement("span");

		removeElement.innerHTML = "Remover";
		removeElement.setAttribute("data-desc", item.descricao);
		removeElement.className = "btn btn-danger";

		if (removeCallback) {
			removeElement.onclick = function () {
				removeCallback(item, removeElement);
			};
		}

		cell.appendChild(removeElement);

		/*$(cell).append($(removeElement).data("ide", item.id).addClass("btn btn-danger remover").text("Remover").click(function () {
			removeCallback($(this).data("ide"));
			console.log($(this).data("ide"));
		}));*/
	}
};
