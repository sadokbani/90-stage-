const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");


const commentaireSchema = new Schema({
  categorieNom: { type: String, required: true },
  SousCategorieNom: { type: String, required: true },
  promotionNom: { type: String, required: true },
  commentaire: { type: String, required: true },
  user: { nom: String, email: String },
  dateCreation: { type: Date, default: Date.now},
  valide: { type: Number, default: 1},

});



module.exports = mongoose.model("commentaire", commentaireSchema);
