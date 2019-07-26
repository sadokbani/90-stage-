
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
    Date: { type: Date,default: Date.now},
    Etat: {type : Number,default: 1}
},

  {
    collection: 'historique'
  });

module.exports = mongoose.model('historique', historique);
