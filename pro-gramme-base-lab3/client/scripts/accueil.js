function toCategorie(cat){
    window.location.replace('#/categorie?categorie=' + cat);
}


function charger() {
    let text = $('#search-cat').val();
    let urlToCall = "/categories"
    if (text) {
        urlToCall += "?nom=" + text;
    }

    $('#row-cat').empty();
    $.ajax({
        url: urlToCall,
        method: "GET",
        success: function( result ) {
            $.each(result, function(key, value) {
                $('#row-cat').append('<div class="col-6 text-center"><button class="button" onclick="toCategorie('+value.id+')">'+value.nom+'</button></div>');
            });
        }
    });
}

