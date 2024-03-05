const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: function () {
      return !this.googleId; // Rend le champ `password` obligatoire si `googleId` est vide
    },
  },
  googleId: { type: String }, // Champ pour l'ID Google
  // We want array of strings
  crypto: { type: [Number], required: false, default: [] },
  articlesPrefs: { type: [String], required: false, default: [] },
  isAdmin:{type:Boolean,default:false}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
