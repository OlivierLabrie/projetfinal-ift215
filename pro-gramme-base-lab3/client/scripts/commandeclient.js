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
            $.each(vente_info.produits, function(key, value) {
                $('#table_commandeclient').append(load_produit(value));
            });
        }
    });
}

function getIdVente() {
    let url = new URL(window.location.href.replace(/#/g,""));
    idVente = url.searchParams.get("idVente");
}

function load_produit(produit) {

    let image = $('<td></td>')
        .append('<img src="../images/'+produit.nomProduit+'.png">');

    let nom = $('<td></td>')
        .append(produit.nomProduit);

    let qte = $('<td></td>')
        .append(produit.quantite);

    return $('<tr></tr>').append(image).append(nom).append(qte);
}

function delete_vente() {
    $.ajax({
        url: "/ventes/" + idVente,
        method:"DELETE",
        data: {'idClient': vente_info.idClient},
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_ADMIN);
        },
        success: function(result) {
            $('#succesSuppressionModal').modal('toggle');
        },
        error: function(result) {
            $('#erreurSuppressionModal').modal('toggle');
        }
    });
}
