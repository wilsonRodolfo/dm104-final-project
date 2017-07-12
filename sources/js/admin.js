$(document).ready(function() {
    $('#tableclientes').DataTable( {
    	"lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, urlTableLangMenu]],
		"deferRender": true,
        "stateSave": true,
		"ajax": {
            "url": "grupoEntrada.json.php",
            "type": "POST",
            "data": { 
            	Opcao: "Carregar"
            }
        },
        language: {
        	"url": urlTableLang
	    }
    });
} );