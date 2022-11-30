function inscrireNewClient(){
    let PRENOM = document.getElementById("prenom").value;
    let NOM = document.getElementById("nom").value;
    let AGE = document.getElementById("age").value;
    let ADRESSE = document.getElementById("adresse").value;
    let PAYS = document.getElementById("pays").value;
    let COURRIEL = document.getElementById("sonCourriel").value;
    let MDP = document.getElementById("motDePasse").value;

    $.ajax({
        url: "/clients/",
        method: "POST",
        data:JSON.stringify({"mdp":MDP,"prenom":PRENOM,"nom":NOM,"age":AGE,"adresse":ADRESSE,"pays":PAYS,"courriel":COURRIEL}),
        contentType: "application/json",
        success: function(result){
            document.getElementById(`messageValide`).setAttribute("style","display:block")
            setTimeout(()=>{
                document.getElementById(`messageValide`).setAttribute("style","display:none")
            },3000)
        },
        error: function(result){
            document.getElementById(`messageInvalide`).setAttribute("style","display:block")
            setTimeout(()=>{
                document.getElementById(`messageInvalide`).setAttribute("style","display:none")
            },3000)
        }
    });
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
