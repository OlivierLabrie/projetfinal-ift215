let TOKEN_ADMIN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MCwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM2NzUyMzAxLCJleHAiOjE4MzY3NTk1MDF9.QYtVOl6o87doRiT2EsezLqtSpz27K-nEZ4KqcmZV5Ac";

let status_list;

function chargercommandes(){
    $.ajax({
        url: "/ventes",
        method:"GET",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_ADMIN);
        },
        success: function( result ) {
            $.each(result, function (key, value) {
                getStatus().then(function(status) {
                    status_list = status;
                    console.log(status_list);
                    commandes_to_html(value).then(function(item) {
                        $('#table_commandes').append(item);
                    });
                });
            });

        }
    });
}


function commandes_to_html(item) {
    return new Promise(function(resolve) {
        getClient(item.idClient).then(function(client) {
            if (client == undefined) {
                return $('');
            }
            //console.log(item);

            table_data_commande = $('<td></td>')
            table_data_status = $('<td></td>');

            card = $('<div class="card"></div>');

            card_body = $('<div></div>')
                .addClass('card-body');

            card_title = $('<h3></h3>')
                .addClass('card-title')
                .append('<u>' + client.prenom + ' ' + client.nom + '</u>');

            adresse = $('<p></p>')
                .addClass('card-text')
                .append('<strong>Adresse :</strong> ' + client.adresse);

            produits = $('<p></p>')
                .addClass('card-text')
                .append('<strong>Produit(s) commandé(s) :</strong> ');

            liste_produits = $('<ul></ul>');
            $.each(item.produits, function (key, value) {
                produit = $('<li></li>')
                    .append(value.nomProduit);
                liste_produits.append(produit);
            });
            produits.append(liste_produits);



            card_body.append(card_title).append('<br>').append(adresse).append(produits);
            card.append(card_body);
            table_data_commande.append(card);

            resolve($('<tr></tr>').append(table_data_commande));
        });
    });
}


function getClient(idClient) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: "/clients",
            method:"GET",
            beforeSend: function (xhr){
                xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_ADMIN);
            },
            success: function( result ) {
                resolve(result.find(({id}) => id == idClient));
            },
            error: function(err) {
                reject(err);
            }
        });
    });
}

function getStatus() {
    return new Promise(function(resolve,reject) {
        $.ajax({
           url: "/statusCommande",
           success: function( result ) {
               resolve(result);
           },
           error: function (err) {
               reject(err);
           }
        });
    });
}

/*
FOR GETTING THE PARAMETER INSIDE THE URL FOR COMMANDS OF SPECIFIC CLIENT

    window.location.replace("#/employe?id=1");

    var myUrl = new URL(window.location.href.replace(/#/g,""));

    console.log(myUrl);

    var param_value = myUrl.searchParams.get("id");

    console.log(param_value);
 */
