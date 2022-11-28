function chargercategorie3(){
    $.ajax({
        url: "/categorie3",
        success: function( result ) {
            $.each(result, function (key, value) {
                if(value.categorie.id === 3){
                    item = item_to_html_categorie3(value);
                    $('#list_items').append(item);}
            });
        }
    });
}


function item_to_html_categorie3(item){
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