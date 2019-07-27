

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Pays = new Schema({


    Nom: {
      type: String
    },
   Priority: {
      type: Number
    },
    valide: { type: Number, default: 1},

  },

  {
    collection: 'Pays'
  });

module.exports = mongoose.model('Pays', Pays);
