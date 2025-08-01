const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req,res)=>{
    try {
        const {username, email, password} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: "email already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({username, email, password: hashedPassword});
        await newUser.save();

        res.status(201).json({message:"user created successfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (!password || !user.password) {
      return res.status(400).json({ message: "Missing credentials" });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    const { password: pwd, ...userData } = user._doc;
    res.status(200).json({ token, user: userData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
