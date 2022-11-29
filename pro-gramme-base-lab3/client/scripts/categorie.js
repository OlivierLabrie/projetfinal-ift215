let categorie;
let test;

function chargercategorie(){
    getCategorie();
    $.ajax({
        url: "/categories/",
        method: 'GET',
        success: function( result ) {
            $.each(result, function (key, value) {
                console.log('Value: ' + value.id)
                console.log('Categorie:' + categorie)
                if(value.id == categorie){
                    console.log("Dans IF")

                    chargerproduitscategories();
                }
            });

            set_panier_categorie();
        }
    });
}

function chargerproduitscategories(){
    $.ajax({
        url: "/produits",
        success: function( result ) {
            $.each(result, function (key, value) {
                if(value.categorie.id == categorie){
                    item = item_to_html_categorie(value);
                    $('#list_items').append(item);
                }
            });

            set_panier_categorie();
        }
    });
}

function getCategorie() {
    let url = new URL(window.location.href.replace(/#/g,""));
    categorie = url.searchParams.get("categorie");
}


function item_to_html_categorie(item){
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
        ' <button type="button" class="btn btn-primary position-relative" onclick="add_item_categorie(['+item.id+'])">\n' +
        ' <i class="bi bi-cart-plus"></i>\n' +
        ' </button>\n' +
        '</p>')
    item_body.append(description).append(cart);



    item_card.append(item_head).append(item_body);



    return $('<div></div>').addClass('col-md-3') .append(item_card);
}


function chargerpaniercategorie(){
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


function set_panier_categorie() {
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


function add_item_categorie(item) {
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

