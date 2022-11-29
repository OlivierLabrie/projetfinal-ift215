const express = require('express');
const gConnexion = require('./../util/gestionnaires').gConnexion;
const { validate, Joi } = require('express-validation');
//const auth = require('./../middleware/auth');

const router = express.Router();

const connexionValidation = {
  body: Joi.object({
    courriel: Joi.string().email().required(),
    mdp: Joi.string().required()
  })
};

const idValidation = {
  params: Joi.object({
    idClient: Joi.number().integer()
  })
};

/**
 * Connecte un usager avec son courriel et son mdp
 */
router.post('/:idClient', validate(connexionValidation), gConnexion.connecte.bind(gConnexion));

/**
 * Déconnecte un usager avec son id
 */
router.delete('/:idClient', validate(idValidation), gConnexion.deconnecte.bind(gConnexion));

/**
 *Connecte un admin avec son courriel et son mdp
*/
//router.get('/:idClient',validate(connexionValidation),auth.admin, gConnexion.connecte.bind(gConnexion));

module.exports = router;
