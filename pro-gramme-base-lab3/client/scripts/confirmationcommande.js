


function chargerpanier(){
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
                item = load_panier(value);
                $('#body_table').append(item);
            });
        }
    });
}

function load_panier(item) {


    image = $('<img src="../images/' + item.nomProduit + '.png" style = "border-right: 2px solid #666DF2"/>');
    nom = $('<td></td>').append(item.nomProduit);
    prix = $('<td></td>').append(item.prix);
    qte = $('<td><button onclick="ajouterItem('+ item.id + ')">+</button><button onclick="enleverItem('+ item.id + ')">-</button>             </td>').append(item.quantite);
    total = $('<td></td>').append(Math.round(item.quantite * item.prix * 100) / 100);
    trash = $('<td></td>')
        .append('<button type="button" class="btn" onClick="remove_item([' + item.id + '])"><span class="bi bi-trash" aria-hidden="true"></span></button>')


    return $('<tr style = "border: 4px solid #666DF2"></tr>').append(image).append(nom).append(prix).append(qte).append(total).append(trash);
}