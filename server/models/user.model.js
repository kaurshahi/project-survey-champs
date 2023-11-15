import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config/config.js";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
  },
  password: {
    type: String,
    required: "Password is required",
  },
});

UserSchema.virtual("hashedPassword")
  .set(function (password) {
    this._password = password;
    this.password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.path("password").validate(function (v) {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters.");
  }
}, null);

UserSchema.methods = {
  authenticate: function (plainText) {
    return bcrypt.compareSync(plainText, this.password);
  },
  encryptPassword: function (password) {
    if (!password) return "";

    try {
      return bcrypt.hashSync(password, 10);
    } catch (err) {
      console.error("Error during password hashing:", err);
      throw new Error("Password hashing failed");
    }
  },
  generateJWT: function () {
    const payload = {
      _id: this._id,
      email: this.email,
    };
    const secret = config.jwtSecret;
    const options = {
      expiresIn: "1h",
    };
    return jwt.sign(payload, secret, options);
  },
};

UserSchema.pre("save", function (next) {
  this.updated = Date.now();
  next();
});

export default mongoose.model("User", UserSchema);
