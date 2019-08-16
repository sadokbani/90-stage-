const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PVT = new Schema({
        Nom: {
            type: String
        },
        Priority: {
            type: Number
        },
          ID_commercant: {type: String},
        valide: { type: Number, default: 1},

    },

    {
        collection: 'PVT'
    });

module.exports = mongoose.model('PVT', PVT);
