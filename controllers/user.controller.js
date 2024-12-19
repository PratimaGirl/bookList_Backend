const User = require("../db/models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;

const createUser = async (req, res) => {
  let success = false;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  const salt = await bcrypt.genSalt(10);
  let securePass = await bcrypt.hash(req.body.password, salt);

  try {
    await User.create({
      username: req.body.username,
      password: securePass,
      email: req.body.email,
      isAdmin: req.body.isAdmin || false,
    })
      .then((user) => {
        const data = {
          user: {
            id: user.id,
          },
        };
        const authToken = jwt.sign(data, jwtSecret);
        success = true;
        res.json({ success, authToken });
      })
      .catch((err) => {
        console.log(err);
        res.json({ error: "Please enter a unique value." });
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const login = async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success, error: "Invalid credentials" });
    }

    const pwdCompare = await bcrypt.compare(password, user.password);
    if (!pwdCompare) {
      return res.status(400).json({ success, error: "Invalid credentials" });
    }

    const data = {
      user: {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    };

    success = true;
    const authToken = jwt.sign(data, jwtSecret);

    res.json({
      success,
      authToken,
      userId: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error(error.message);
    res.send("Server Error");
  }
};

const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  login,
  getUser,
};
