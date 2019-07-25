
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let historique = new Schema({

    Utilisateur: {
      type: String
    },
    Promotion: {
      type: String
    },
    Coupon: {
      type: String
    },
    Remise: { type: String},
    Date: { type: Date,},
    Etat: {type : String,}
},

  {
    collection: 'historique'
  });

module.exports = mongoose.model('historique', historique);
