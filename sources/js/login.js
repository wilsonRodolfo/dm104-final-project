/* JavaScript Document */

var login = {
    init: function () {
        login.submitLogin();
    },

    submitLogin: function () {
        var form = document.getElementById('formlogin');
        if (form) {
            form.onsubmit = function () {
                ClienteDAO.unserializeAndParse();
                if (!form.inputEmail.value || !form.inputPassword.value) {
                    window.alert("Preencha todos campos para continuar!");
                } else if (form.inputEmail.value == "admin@admin" && form.inputPassword.value == "admin") {
                    window.location.href = "admin.html";
                } else {
                    let cliente = ClienteDAO.get(form.inputEmail.value);
                    if (cliente) {
                        if (cliente.senha == form.inputPassword.value) {
                            sessao.login(cliente);
                            window.location.href = "index.html";
                        }
                        else
                            window.alert("Senha incorreta!");

                    } else
                        window.alert("Email incorreto!");
                }
                return false; //to prevent the formLogin submition
            };
        }
    }
};

login.init();