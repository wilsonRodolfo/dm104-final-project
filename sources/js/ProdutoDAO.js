/* JavaScript Document */

var ProdutoDAO = {

    DB_KEY: "produtos",
    NEW: 1,
    UPDATE: 2,
    ERRO: -1,

    list: [
        { "id": "1", "descricao": "Painel Frozen", "caminhoImg": "../../images/painel-frozen.jpg", "preco": "19.90" },
        { "id": "2", "descricao": "Painel Homem Aranha", "caminhoImg": "../../images/painel-homemaranha.jpg", "preco": "19.90" },
        { "id": "3", "descricao": "Painel Carros", "caminhoImg": "../../images/painel-carros.jpg", "preco": "19.90" },
        { "id": "4", "descricao": "Painel Minnie", "caminhoImg": "../../images/painel-minnie.jpg", "preco": "19.90" },
        { "id": "5", "descricao": "Painel Homem Aranha", "caminhoImg": "../../images/painel-galinha.jpg", "preco": "19.90" },
        { "id": "6", "descricao": "Painel Sofia", "caminhoImg": "../../images/painel-sofia.jpg", "preco": "19.90" }
    ],

    init: function() {
        ProdutoDAO.serializeAndSave();
    },

    save: function (produto) {
        ProdutoDAO.unserializeAndParse();
        var list = ProdutoDAO.list, index = ProdutoDAO.getIndex(produto);
        let retorno = ProdutoDAO.ERRO;

        if (index > -1) {
            list[index] = produto;
            console.log("produto já existe... Atualizando");
            retorno = ProdutoDAO.UPDATE;
        }
        else {
            list.push(produto);
            retorno = ProdutoDAO.NEW;
        }

        ProdutoDAO.serializeAndSave();

        return retorno;
    },

    retrieve: function () {
        ProdutoDAO.unserializeAndParse();
        var list = ProdutoDAO.list;
        if (list && list.length > 0) {
            return list;
        }
        return null;
    },

    get: function (id) {
        ProdutoDAO.unserializeAndParse();
        var list = ProdutoDAO.list,
            index = ProdutoDAO.getIndex({ 'id': id });

        if (index > -1) {
            var produto = list[index];
            return produto;
        }

        return null;
    },

    getIndex: function (produto) {
        ProdutoDAO.unserializeAndParse();
        var list = ProdutoDAO.list,
            item = {};

        for (var i = 0; i < list.length; i++) {
            item = list[i];
            if (item.id == produto.id) {
                return i;
            }
        }

        return -1;
    },

    delete: function (id) {
        ProdutoDAO.unserializeAndParse();
        var list = ProdutoDAO.list,
            index = ProdutoDAO.getIndex({ 'id': id });

        if (index > -1) {
            //https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/splice
            list.splice(index, 1);
            return true;
        }

        return false;
    },

    serializeAndSave: function () {
        var list = ProdutoDAO.list;
        if (list && list.length > 0) {
            var json = JSON.stringify(ProdutoDAO.list);
            window.localStorage.setItem(ProdutoDAO.DB_KEY, json);
        }
    },

    unserializeAndParse: function () {
        var json = window.localStorage.getItem(ProdutoDAO.DB_KEY);
        if (json) {
            ProdutoDAO.list = JSON.parse(json);
        }
        else {
            ProdutoDAO.list = [];
        }
    }

};

ProdutoDAO.init();
