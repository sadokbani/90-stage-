// Product.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Product
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
  CategorieImage: { type: String,}
},

  {
    collection: 'Categorie'
});

module.exports = mongoose.model('Categorie', Categorie);
