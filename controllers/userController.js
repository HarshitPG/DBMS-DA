const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Registering a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    const token = jwt.sign(
      { username: user.username, id: user._id, email: user.email },
      process.env.JWT_SECRET
    );

    console.log(`User created ${user}`);
    console.log(`User token ${token}`);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email: email,
    });

    if (user) {
      const validity = await bcrypt.compare(password, user.password);
      if (!validity) {
        res.send(400).json("Wrong password");
      } else {
        const token = jwt.sign(
          { id: user._id, name: user.name, email: user.email },
          process.env.JWT_SECRET
        );
        console.log(`User created login : ${user}`);
        console.log(`User token login: ${token}`);
        res.status(200).json({ user, token });
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { registerUser, loginUser };
