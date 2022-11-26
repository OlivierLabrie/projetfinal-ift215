//const {validate} = require("express-validation");
//const auth = require("../../middleware/auth");
//const {gClients} = require("../../util/gestionnaires");
let ID_CLIENT = 1;
let TOKEN_CLIENT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k";

function chargerproduits(){
    $.ajax({
        url: "/produits",
        success: function( result ) {
            $.each(result, function (key, value) {
                item = item_to_html(value);
                $('#list_items').append(item);
            });

            set_panier();
        }
    });
}

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


function set_panier() {
    $.ajax({
        url: "/clients/"+ID_CLIENT+"/panier",
        method:"GET",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: function( result ) {
            $('#item_counter').text(result.items.length);
        }
    });
}

function item_to_html(item){
    item_card = $('<div></div>')
        .addClass('card mb-4 rounded-3 shadow-sm');
    item_head = $('<div</div>')
        .addClass('card-header py-3')
        .append('<h4 class="my-0 fw-normal">' + item.nom + '</h4>');
    item_detail = $('<ul></ul>')
        .addClass('list-unstyled mt-3 mb-4')
        .append('<li>Categorie. :' + item.categorie.nom +'</li>');
    item_body = $('<div></div>')
        .addClass('card-body')
        .append(' <h1 class="card-title text-center"> $' + item.prix +'</h1>');

    description = $('<div></div>')
        .addClass('list-unstyled mt-3 mb-4')
        .append('<li>Qte dispo:' + item.qte_inventaire + '</li>')
        .append('<li>Catégorie:' + item.categorie.nom + '</li>')
        .append('<br />')
        .append('<li>' + item.description + '</li>')
    cart = $('<p class="w-100 display-6 text-center">\n' +
        ' <button type="button" class="btn btn-primary position-relative" onclick="add_item(['+item.id+'])">\n' +
        ' <i class="bi bi-cart-plus"></i>\n' +
        ' </button>\n' +
        '</p>')
    item_body.append(description).append(cart);



    item_card.append(item_head).append(item_body);



    return $('<div></div>').addClass('col-md-3') .append(item_card);
}


function add_item(item) {
    let id_item = item[0];

    $.ajax({
        url: "/clients/"+ID_CLIENT+"/panier",
        method:"POST",
        data: {"idProduit": id_item, "quantite": 1},
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: function( result ) {
            $('#item_counter').text(result.items.length);
        }
    });
}

function remove_item(item) {
    let id_item = item[0];
    $.ajax({
        url: "/clients/"+ID_CLIENT+"/panier/" + id_item,
        method:"DELETE",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: function( result ) {

            chargerpanier();
        }
    });
}

function ajouterItem(item){

$.ajax({
    url:"/clients/"+ID_CLIENT+"/panier/" + item,
    method:"PUT",
    data: {'quantite': 1},
    beforeSend: function (xhr){
        xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
    },
    success: function( result ) {

        chargerpanier();
    }})
}

function enleverItem(item){

    $.ajax({
        url:"/clients/"+ID_CLIENT+"/panier/" + item,
        method:"PUT",
        data: {'quantite': -1},
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: function( result ) {

            chargerpanier();
        }})
}

function load_panier(item) {

    image = $('<img src="../images/' + item.nomProduit + '.png" style = "border-right: 2px solid #666DF2"/>');
    nom = $('<td></td>').append(item.nomProduit);
    prix = $('<td></td>').append(item.prix);
    qte = $('<td><button onclick="ajouterItem('+ item.id + ')">+</button><button onclick="enleverItem('+ item.id + ')">-</button></td>').append(item.quantite);
    total = $('<td></td>').append(Math.round(item.quantite * item.prix * 100) / 100);
    trash = $('<td></td>')
        .append('<button type="button" class="btn" onClick="remove_item([' + item.id + '])"><span class="bi bi-trash" aria-hidden="true"></span></button>')

    return $('<tr style = "border: 4px solid #666DF2"></tr>').append(image).append(nom).append(prix).append(qte).append(total).append(trash);
}
