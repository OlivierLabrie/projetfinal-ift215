function clicMenuGauche(lien){
    lien.style.color = "#F00";
    lien.innerText += " cliqué!"
}

function deconnecter() {
    $('#nom-utilisateur').empty();

    $('#connexion').css('display', 'block');
    $('#deconnexion').css('display', 'none');

    $('#commandes').css('display', 'none');

    ID_CLIENT = -1;
    TOKEN_CLIENT = 0;
    TOKEN_ADMIN = 0;

    window.location.replace('#/');
}
