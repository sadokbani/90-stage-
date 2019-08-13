const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt= require('bcrypt');


const userSchema = new Schema({

  nom: { type: String, required: true },
  prenom: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  nombreJeton: Number,
  role:  Number,
  dateCreation: { type: Date, default: Date.now},
  valide: { type: Number, default: 1},
  imagePath: { type: String, required: true }
});

userSchema.statics.hashPassword = function hashPassword(password){
  return bcrypt.hashSync(password,10);
};

userSchema.methods.isValid = function isValid(hashedpassword){
  return  bcrypt.compareSync(hashedpassword, this.password);
};

module.exports = mongoose.model("user", userSchema);
