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
            },2500)
        },
        error: function(result){
            document.getElementById(`messageInvalide`).setAttribute("style","display:block")
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

            $('#nom-utilisateur').empty();
            $('#nom-utilisateur').append('<i class="bi bi-person-circle"></i> ' + COURRIEL);
            $('#nom-utilisateur').css('display', 'block');

            $('#connexion').css('display', 'none');
            $('#deconnexion').css('display', 'block');

            if(result.role === 'admin'){
                window.location.replace('#/commandes')
            }
            else{
                window.location.replace('#/')
            }
        },
        error: function (result) {
            document.getElementById(`error`).setAttribute("style","display:block")
        }
    });
}

function fermetureMessageError(){
    document.getElementById(`error`).setAttribute("style","display:none")
}

function fermetureMessageInvalide(){
    document.getElementById(`messageInvalide`).setAttribute("style","display:none")
}

function validationPrenom(){
    var message = document.getElementById(`prenom`).value;
    var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);
    var patternNumber = new RegExp(/[0-9]/);

    if(message == "" || message == null){
        document.getElementById('prenom').setAttribute("class","form-control is-invalid")
    }
    else if(pattern.test(message)){
        document.getElementById('prenom').setAttribute("class","form-control is-invalid")
    }
    else if(patternNumber.test(message)){
        document.getElementById('prenom').setAttribute("class","form-control is-invalid")
    }
    else{
        document.getElementById('prenom').setAttribute("class","form-control is-valid")
    }
}

function validationNom(){
    var message = document.getElementById(`nom`).value;
    var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>()\?]/);
    var patternNumber = new RegExp(/[0-9]/);

    if(message == "" || message == null){
        document.getElementById('nom').setAttribute("class","form-control is-invalid")
    }
    else if(pattern.test(message)){
        document.getElementById('nom').setAttribute("class","form-control is-invalid")
    }
    else if(patternNumber.test(message)){
        document.getElementById('nom').setAttribute("class","form-control is-invalid")
    }
    else{
        document.getElementById('nom').setAttribute("class","form-control is-valid")
    }
}

function validationAge(){
    var message = document.getElementById(`age`).value;
    var pattern = new RegExp(/[A-Za-z]/);

    if(message == "" || message == null){
        document.getElementById('age').setAttribute("class","form-control is-invalid")
    }
    else if(pattern.test(message)){
        document.getElementById('age').setAttribute("class","form-control is-invalid")
    }
    else{
        document.getElementById('age').setAttribute("class","form-control is-valid")
    }
}

function validationAdresse(){
    var message = document.getElementById(`adresse`).value;

    if(message == "" || message == null){
        document.getElementById('adresse').setAttribute("class","form-control is-invalid")
    }
    else{
        document.getElementById('adresse').setAttribute("class","form-control is-valid")
    }
}

function validationPays(){
    var message = document.getElementById(`pays`).value;
    var patternNumber = new RegExp(/[0-9]/);

    if(message == "" || message == null){
        document.getElementById('pays').setAttribute("class","form-control is-invalid")
    }
    else if(patternNumber.test(message)){
        document.getElementById('pays').setAttribute("class","form-control is-invalid")
    }
    else{
        document.getElementById('pays').setAttribute("class","form-control is-valid")
    }
}

function validationCourriel(){
    var message = document.getElementById(`sonCourriel`).value;

    if(message == "" || message == null){
        document.getElementById('sonCourriel').setAttribute("class","form-control is-invalid")
    }

    else{
        document.getElementById('sonCourriel').setAttribute("class","form-control is-valid")
    }
}

function validationMDP(){
    var message = document.getElementById(`motDePasse`).value;

    if(message == "" || message == null){
        document.getElementById('motDePasse').setAttribute("class","form-control is-invalid")
    }
    else{
        document.getElementById('motDePasse').setAttribute("class","form-control is-valid")
    }
}
