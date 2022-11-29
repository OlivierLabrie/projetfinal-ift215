let prixLivraison = 0;

function chargerconfirmationcommande(){
    $.ajax({
        url: "/clients/"+ID_CLIENT+"/panier",
        method:"GET",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: function( result ) {
            $('#body_table').empty();
            console.log(result);
            $.each(result.items, function (key, value) {
                item = load_panier_commande(value);
                $('#body_table').append(item);
                chargerTotalCommande();
            });
        }
    });
}

function load_panier_commande(item) {


    image = $('<img src="../images/' + item.nomProduit + '.png" style = "border-right: 2px solid #666DF2"/>');
    nom = $('<td></td>').append(item.nomProduit);
    prix = $('<td></td>').append(item.prix);
    qte = $('<td></td>').append(item.quantite);
    total = $('<td></td>').append(Math.round(item.quantite * item.prix * 100) / 100);
    trash = $('<td></td>')
        .append('<button type="button" class="btn" onClick="remove_item([' + item.id + '])"><span class="bi bi-trash" aria-hidden="true"></span></button>')

    prixLivraison = 15;
    return $('<tr style = "border: 4px solid #666DF2"></tr>').append(image).append(nom).append(qte).append(prix);
}


function chargerTotalCommande(){
    $.ajax({
        url: "/clients/"+ID_CLIENT+"/panier",
        method:"GET",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: function( result){
            $('#prixTOT').text(Math.round(result.valeur * 100) / 100 + ' $');
            $('#buttonConfirmer').text('Confirmer la commande');
            $('#livraison').text(prixLivraison + ' $');
            calculerTaxes();
            calculerGrandTotal();
            for( let i in result.items){
                item = item_to_html(result.items[i])
                $('#list_panier').append(item);
            }
        }
    });
}

function calculerTaxes(){
    $.ajax({
        url: "/clients/"+ID_CLIENT+"/panier",
        method:"GET",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: function( result){
            $('#taxes').text(Math.round((result.valeur * 0.15) * 100) / 100 + ' $');
            $('#buttonConfirmer').text('Confirmer la commande');
            for( let i in result.items){
                item = item_to_html(result.items[i])
                $('#list_panier').append(item);
            }
        }
    });
}

function calculerGrandTotal(){
    $.ajax({
        url: "/clients/"+ID_CLIENT+"/panier",
        method:"GET",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: function( result){
            $('#grandtotal').text(Math.round(((result.valeur * 0.15) + result.valeur + prixLivraison) * 100) / 100 + ' $');
            for( let i in result.items){
                item = item_to_html(result.items[i])
                $('#list_panier').append(item);
            }
        }
    });
}

function retourPanier() {
    window.location.replace('#/panier');
}

function vente(){
    $.ajax({
        url: "/ventes",
        method:"POST",
        data: {'idClient': ID_CLIENT},
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: function(result) {
            chargerconfirmationcommande();
            chargerTotalCommande();
            calculerTaxes();
            calculerGrandTotal();
            prixLivraison = 0;
            console.log("Successs ")
            $('#succesSuppressionModal').modal('toggle');
        },
        error : function (result){
            console.log("erreur");
            $('#erreurSuppressionModal').modal('toggle');
        }
    })
}