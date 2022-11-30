//const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");


function menuGaucheClic(lien){
    let menu = document.getElementById('menu-gauche');
    let liens = menu.children;
    for (let i = 0 ; i<liens.length ; i++){
        liens[i].classList.remove("choisi")
    }
    lien.classList.add("choisi");
}

function attacherListenerMenuGauche(){
    let menu = document.getElementById("menu-gauche");
    let liens = menu.children;
    for (let i = 0 ; i<liens.length ; i++){
        liens[i].addEventListener('click', function(){
            menuGaucheClic(liens[i])
        });
    }
}

function validateConnexion(){
    var error = document.getElementById("courriel").value;
}


function versCommande(){
    let COURRIEL = document.getElementById("courriel").value;
    let MDP =document.getElementById("mot-de-passe").value;

    $.ajax({
        url: "/connexion/" + ID_CLIENT,
        method:"POST",
        data:JSON.stringify({"courriel":COURRIEL,"mdp":MDP}),
        contentType: "application/json",
        success: function(result){
            TOKEN_CLIENT = result.token;
            TOKEN_ADMIN = result.token;
            ID_CLIENT = result.idClient;

            if(result.role === 'admin'){
                window.location.replace('#/commandes')
            }
            else{
                window.location.replace('#/')
            }
        },
        error: function (result) {
            document.getElementById(`error`).setAttribute("style","display:block")
            setTimeout(()=>{
                document.getElementById(`error`).setAttribute("style","display:none")
            },5500)
        }
    });
}

/**
 * Fonction qui initie le lancement des fonctions de ce script. Appelée par "chargerSousContenu" dans navigation.js.
 * Remplace le DOMContentLoaded qui est lancé bien avant que le contenu associé à ce script ne soit dans l'écran.
 * @returns {Promise<void>}
 */
async function chargerinscription (){
    attacherListenerMenuGauche()
}

