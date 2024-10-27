const User = require('../models/userSchema')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const secret = 'ganesh'

exports.createUser = async (req, res) => {
    const data = req.body;
    const { email } = data;
    // existing user
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res.status(400).json({ error: "user already exists !" })
    }
    const user = new User(data)
    await user.save()
    res.status(201).json({ newUser: user, msg: "user created successfully!" })

}

exports.viewAll = async (req, res) => {
    const user = await User.find();
    res.status(200).json(user);
}

exports.onlyOne = async (req, res) => {
    const id = req.params.id
    const user = await User.findById(id)
    if (!user) {
        return res.status(400).json({ error: "user not exists!!" })
    }
    res.status(200).json({ user: user })
}

exports.UpdateUser = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const user = await User.findByIdAndUpdate(id, data);
    res.status(200).json(user)
}

exports.deleteUser = async (req, res) => {
    const id = req.params.id
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted successfully!", name: user.name })

}


exports.signUp = async (req, res) => {
    const data = req.body
    const { name, email, password } = data;

    // hash passwordd
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)

    // existing user 
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res.status(400).json({ error: "user already exists !" })
    }

    const userData = { name, email, password: hash }
    const user = new User(userData);
    await user.save();
    res.status(201).json(user);

}

exports.login = async (req, res) => {
    const { email, password } = req.body

    // chech existing  or new user
    const existingUser = await User.findOne({ email })
    if (!existingUser) {
        return res.status(400).json({ error: "user not exists! please signup" })
    }

    const match = await bcrypt.compare(password, existingUser.password)
    if (!match) {
        return res.status(400).json({ error: "invalid password !" })
    }

    const token = JWT.sign({ id: existingUser._id }, secret, { expiresIn: '1m' })
    res.json({ token, existingUser });
}