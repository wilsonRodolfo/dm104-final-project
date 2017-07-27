/* JavaScript Document */
var sessao = {
    DB_KEY: "sessao",

    login: function (cliente) {
        let cli = {};
        cli.nome = cliente.nome;
        cli.email = cliente.email;
        var json = JSON.stringify(cli);
        window.localStorage.setItem(sessao.DB_KEY, json);
    },

    checkAndGetUser: function () {
        var json = window.localStorage.getItem(sessao.DB_KEY);
        if (json) {
            cliente = JSON.parse(json);
            return cliente;
        }
    },

    checkAndSetUser: function () {
        var json = window.localStorage.getItem(sessao.DB_KEY);
        if (json) {
            cliente = JSON.parse(json);
            document.getElementById('saudacao').textContent = "Olá, " + cliente.nome;

            document.getElementById('linkCadastrar').style.display = 'none';
            document.getElementById('btnEntrar').textContent = "Sair";
        } else {
            document.getElementById('iconCarrinho').style.display = 'none';
            document.getElementById('iconUser').style.display = 'none';
        }
    },

    btnLoginClick: function () {
        var btn = document.getElementById('btnEntrar');
        if (btn) {
            if (btn.textContent == "Entrar") {
                window.location.href = "login.html";
            } else {
                window.localStorage.setItem(sessao.DB_KEY, "");
                window.location.href = "index.html";
            }
        }
    }
};