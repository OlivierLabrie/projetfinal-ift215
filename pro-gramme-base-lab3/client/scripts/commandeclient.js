let TOKEN_ADMIN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MCwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM2NzUyMzAxLCJleHAiOjE4MzY3NTk1MDF9.QYtVOl6o87doRiT2EsezLqtSpz27K-nEZ4KqcmZV5Ac";

let vente_info;
let idVente;

function chargercommande_client() {

    getIdVente();
    $.ajax({
        url: "/ventes/" + idVente,
        method:"GET",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_ADMIN);
        },
        success: function(result) {
            vente_info = result;
            console.log(vente_info);
        }
    })
}

function getIdVente() {
    let url = new URL(window.location.href.replace(/#/g,""));
    idVente = url.searchParams.get("idVente");
}
