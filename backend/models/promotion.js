const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const promotionSchema = new Schema({

  commercant: { type: String, required: true },
  categorieNom: { type: String, required: true },
  SousCategorieNom: { type: [String], required: true },
  promotionNom: { type: String, required: true },
    PTV : {type:[String]},
  adresse: { type: String, required: true },
  description: { type: String, required: true },
  imagePath: { type: [String], required: true },
  dateDebut: { type: Date, required: true },
  nombreStock: { type: Number, default: 90},
  valide: { type: Number, default: 0},

});



module.exports = mongoose.model("promotion", promotionSchema);
