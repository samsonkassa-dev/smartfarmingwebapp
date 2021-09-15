const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");
const passport = require("passport");


const userRegister = async (userDets, role, res) => {
  try {
    let emailNotRegistered = await validateEmail(userDets.body.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: "Email already registered. Try logging in instead",
        success: false,
      });
    }
    const password = await bcrypt.hash(userDets.body.password, 12);

    const newUser = new User({
      ...userDets.body,
      password,
      role,
    });
    await newUser.save();
    return res.status(201).json({
      message: "User registered!",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(201).json({
      message: "User registeration failed!",
      success: false,
    });
  }
};

const userLogin = async (userCreds, role, res) => {
  console.log("Auth");
  let { email, password } = userCreds;
  const user = await User.findOne({ email });
  if (!user) {
    console.log("Error")
    return res.status(404).json({
      message: "Email/Password combination incorrect!",
      succes: false,
    });
  }

  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email
      },
      SECRET,
      { expiresIn: "14d" },
      (err, token) => {
        if (err) {
          res.json({message: "Email password incorrect!"})
        };
        res.json({
          message: "Success",
          token: "Bearer " + token,
          role: user.role
          // result: {
          //   name: user.name,
          //   phoneno: user.phoneno,
          //   password: user.password,
          //   email: user.email,
          //   idimg: user.idimg,
          //   id: user._id,
          //   role: user.role,
          // },
        });
      }
    );

    // let result = {
    //   name: user.name,
    //   phoneno: user.phoneno,
    //   password: user.password,
    //   email: user.email,
    //   idimg: user.idimg,
    //   id: user._id,
    //   role: user.role,
    //   token: `Bearer ${token}`,
    //   expiresIn: 168,
    // };

    // return res.status(200).json({
    //   ...result,
    //   message: "You are logged in!",
    //   success: true,
    // });
  } else {
    console.log("Error2")
    return res.status(403).json({
      message: "Email/Password Combination incorrect!",
      succes: false,
    });
  }
};

const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

const userAuth = passport.authenticate("jwt", { session: false });

module.exports = { userRegister, userLogin, userAuth };
