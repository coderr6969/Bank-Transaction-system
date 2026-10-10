const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "e- mail is required"],
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid e- mial address",
      ],
      unique: [true, "E- mail already exists"],
    },
    name: {
      type: String,
      required: [true, "Name is required for creating an account"],
    },
    password: {
      type: String,
      required: [true, "A password is required"],
      minlength: [6, "Password should contain more than 6 characters "],
      select: false, //whenever a user datya request is will be made, this property sets default as to not send the password
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.modified("password")) {
    return next();
  } else {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    return;
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
