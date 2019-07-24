const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Categorie = new Schema({


  SousCategorieNom: {
    type: String
  },

  CategorieNom: {
    type: String
  },
    valide: { type: Number, default: 1},
    Priority: {
    type: Number
  },

},

  {
  collection: 'SousCategorie'
});

module.exports = mongoose.model('SousCategorie', Categorie);
