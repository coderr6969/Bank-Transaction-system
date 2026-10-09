const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

/**
 * -User register controller
 * Post/Aapi/auth/register
 */

async function userRegisterController(req, res) {
  const { email, password, name } = req.body;

  const isExists = await userModel.findOne({
    email: email,
  });

  if (isExists) {
    return res.status(422).json({
      message: "User already exists with this e-mail.",
      status: failed,
    });
  } else {
    const user = await userModel.create({
      email,
      password,
      name,
    });
    //cretae jwt token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    // set token in cookies, npm i cookieparser

    res.cookies(token);

    res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  }
}

module.exports = userRegisterController;
