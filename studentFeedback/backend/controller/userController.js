const User = require("../model/user.js");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password || !confirmPassword) {
    res.status(401).json({
      status: "fail",
      message: "Please provide name, email and password!",
    });
  }

  try {
    const isThere = await User.findOne({ email });
    if (isThere) {
      return res.status(401).json({
        status: "fail",
        message: "Email is already exist!",
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      confirmPassword,
    });

    const token = await jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Get out these two fields
    const { password: pwd, __v, ...others } = newUser._doc;

    res.status(200).json({
      status: "success",
      token,
      data: {
        others,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide email and password",
    });
  }

  // check if user exist
  const usery = await User.findOne({ email }).select("+password");

  if (!usery || !(await usery.correctPassword(password, usery.password))) {
    return res.status(401).json({
      status: "fail",
      message: "incorrect email or password ",
    });
  }

  // create and send token
  const token = await jwt.sign({ id: usery._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const { password: pwd, __v, ...user } = usery._doc;
  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
