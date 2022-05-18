const User = require("../models/userModel");

//@desc Register new user
//@route POST /api/users
//@access PUBLIC

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        user: user._id,
        name,
        email,
        token: user.generateToken(),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    next(error);
  }
};

//@desc Authenticate user
//@route POST /api/users/login
//@access PUBLIC

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.matchPasswords(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email,
        token: user.generateToken(),
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };
