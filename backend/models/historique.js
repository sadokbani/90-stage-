
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let historique = new Schema({

    ID_Utilisateur: {
      type: String
    },

        NOM_Utilisateur: {
            type: String
        },
  ID_commercant: {
    type: String
  },
        NOM_commercant: {
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
