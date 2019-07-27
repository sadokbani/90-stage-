
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Categorie = new Schema({

  CategorieDescription: {
    type: String
  },
  CategorieNom: {
    type: String
  },
  CategoriePriority: {
    type: Number
  },
    valide: { type: Number, default: 1},
  CategorieImage: { type: String,}
},

  {
    collection: 'Categorie'
});

module.exports = mongoose.model('Categorie', Categorie);
