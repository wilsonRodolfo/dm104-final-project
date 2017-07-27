
var relatorioCompras = {
    gerar: function () {
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            var data = new google.visualization.DataTable();

            ProdutoDAO.unserializeAndParse();
            ClienteDAO.unserializeAndParse();

            let produtos = ProdutoDAO.retrieve();
            let clientes = ClienteDAO.retrieve();

            data.addColumn('string', 'Nome do Cliente');
            for (var i = 0; i < produtos.length; i++) {
                data.addColumn('number', 'Quantidade de ' + produtos[i].descricao + ' comprados');
                //data.addColumn('number', 'Quantidade de produtos comprados');
            }

            data.addRows(clientes.length);

            for (var i = 0; i < clientes.length; i++) {
                CarrinhoDAO.unserializeAndParse(clientes[i].email);
                let carrinho = CarrinhoDAO.getCarrinho();
                data.setCell(i, 0, String(clientes[i].nome));
                if (carrinho) {
                    for (var j = 0; j < carrinho.length; j++) {
                        data.setCell(i, parseInt(carrinho[j].id), parseInt(carrinho[j].quantidade));
                    }
                }
            }
            window.open('Relatorio.html', '_blank');
            var table = new google.visualization.ColumnChart(document.getElementById('columnChart'));
            table.draw(data);
        }
    }
}

var relatorioClientes = {
    gerar: function () {
        let tbody = document.getElementById('tableClientes').tBodies[0];
        if (tbody) {
            ClienteDAO.unserializeAndParse();
            let clientes = ClienteDAO.retrieve();

            for (var i = 0; i < clientes.length; i++) {
                let row = document.createElement('tr');

                let cellNome = document.createElement('td');
                let cellTelefone = document.createElement('td');
                let cellEmail = document.createElement('td');

                row.appendChild(cellNome);
                row.appendChild(cellTelefone);
                row.appendChild(cellEmail);

                row.cells[0].innerHTML = clientes[i].nome;
                row.cells[1].innerHTML = clientes[i].telefone;
                row.cells[2].innerHTML = clientes[i].email;

                tbody.appendChild(row);
            }
        }
    }
}

var notaFiscal = {
    gerar: function () {
        let tbody = document.getElementById('tableClientes').tBodies[0];
        if (tbody) {
                let c = sessao.checkAndGetUser();
                ClienteDAO.unserializeAndParse();
                let cliente = ClienteDAO.get(c.email); 

                let row = document.createElement('tr');

                let cellNome = document.createElement('td');
                let cellTelefone = document.createElement('td');
                let cellEmail = document.createElement('td');

                row.appendChild(cellNome);
                row.appendChild(cellTelefone);
                row.appendChild(cellEmail);

                row.cells[0].innerHTML = cliente.nome;
                row.cells[1].innerHTML = cliente.telefone;
                row.cells[2].innerHTML = cliente.email;

                tbody.appendChild(row);
        }

        tbody = document.getElementById('tableNota').tBodies[0];
        if (tbody) {
            let produtos = CarrinhoDAO.retrieve();
            let total = 0;

            for (var i = 0; i < produtos.length; i++) {
                let row = document.createElement('tr');

                let cellDesc = document.createElement('td');
                let cellQuant = document.createElement('td');
                let cellPreco = document.createElement('td');
                let cellTotal = document.createElement('td');

                row.appendChild(cellDesc);
                row.appendChild(cellQuant);
                row.appendChild(cellPreco);
                row.appendChild(cellTotal);

                row.cells[0].innerHTML = produtos[i].descricao;
                row.cells[1].innerHTML = produtos[i].quantidade; //3
                row.cells[2].innerHTML = "R$ " + produtos[i].preco; //19,90

                let totalProd = parseInt(produtos[i].quantidade) * parseFloat(produtos[i].preco);
                total += parseFloat(totalProd);

                row.cells[3].innerHTML = "R$ " + String(totalProd.toPrecision(4));

                tbody.appendChild(row);
            }

            let t = document.getElementById('total');
            t.innerHTML = "Total " + total.toPrecision(4);
        }
    }
}