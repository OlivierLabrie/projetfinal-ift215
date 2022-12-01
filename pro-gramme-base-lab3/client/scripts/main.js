function clicMenuGauche(lien){
    lien.style.color = "#F00";
    lien.innerText += " cliqué!"
}

function deconnecter() {
    // $.ajax({
    //     url: "/connexion/" + ID_CLIENT,
    //     method:"DELETE",
    //     beforeSend: function (xhr){
    //         xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
    //     },
    //     success: function( result ){
    //
    //
    //     }
    // });

    $('#nom-utilisateur').empty();

    $('#connexion').css('display', 'block');
    $('#deconnexion').css('display', 'none');

    ID_CLIENT = -1;
    TOKEN_CLIENT = 0;
    TOKEN_ADMIN = 0;
}
