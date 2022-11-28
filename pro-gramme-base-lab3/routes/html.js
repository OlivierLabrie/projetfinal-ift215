const express = require('express');
const path = require('path');

var router = express.Router();

/**
 * Cette classe sert à retourner les pages HTML. Vous devez modifier cette classe pour ajouter les liens vers vos pages.
 * Le premier paramètre devrait être / suivit du nom de votre page. Le second paramètre est une fonction anonyme. Le
 * paramètre req représente la requête courante et res représente la réponse. La réponse retourne le fichier html demandé.
 * Votre fichier devrait être dans le dossier client.
 */
router.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/accueil.html'));
});

router.get('/inscription', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/inscription.html'));
});

router.get('/points_de_vente', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/points_de_vente.html'));
});

router.get('/produits', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/produits.html'));
});

router.get('/panier', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/panier.html'));
});

router.get('/commandes', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/commandes.html'));
});

router.get('/commandeclient', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/commandeclient.html'));
});

router.get('/confirmationcommande', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/confirmationcommande.html'));
});

router.get('/categorie', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/categorie.html'));
});

router.get('/categorie2', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/categorie2.html'));
});

router.get('/categorie3', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/categorie3.html'));
});

router.get('/categorie4', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/categorie4.html'));
});

router.get('/categorie5', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/categorie5.html'));
});

router.get('/categorie6', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/categorie6.html'));
});

module.exports = router
