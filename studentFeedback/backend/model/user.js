const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "usename must has a name"],
  },
  email: {
    type: String,
    required: [true, "usename must has an email"],
    unique: true,
    validate: [validator.isEmail, "Please provide an email"],
  },
  password: {
    type: String,
    required: [true, "usename must has a password"],
    minlength: [8, "password must be greater or equal than 8"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "please provide confirmPassword"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "password confirm not match",
    },
  },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassowrd
) {
  return await bcrypt.compare(candidatePassword, userPassowrd);
};

module.exports = User = mongoose.model("User", userSchema);
