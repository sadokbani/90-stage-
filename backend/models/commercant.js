const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt= require('bcrypt');


const commercantSchema = new Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  imagePath: { type: String, required: true }
});

commercantSchema.statics.hashPassword = function hashPassword(password){
  return bcrypt.hashSync(password,10);
}

commercantSchema.methods.isValid = function(hashedpassword){
  return  bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model("Commercant", commercantSchema);
