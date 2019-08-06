
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Achats = new Schema({

    ID_client: {
      type: String
    },
    ID_commercant: {
      type: String
    },

  },

  {
    collection: 'Achats'
  });

module.exports = mongoose.model('Achats', Achats);
