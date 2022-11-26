let vente_info;
let idVente;

function chargercommandeclient() {
    getIdVente();
    $.ajax({
        url: "/ventes/" + idVente,
        method:"GET",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_ADMIN);
        },
        success: function(result) {
            vente_info = result;
            console.log(vente_info);

            getClient(vente_info.idClient).then(function(client) {
                $('#client_name').append(client.prenom + ' ' + client.nom);
                $('#client_address').append(client.adresse);
            });
        }
    })
}

function getIdVente() {
    let url = new URL(window.location.href.replace(/#/g,""));
    idVente = url.searchParams.get("idVente");
}
