const bcrypt = require("bcryptjs")
const CryptoJS = require('crypto-js')
const { body } = require('express-validator')

const { User } = require('../../../models')
const { checkValidation } = require('../../_helpers')



const validation = [
    body('email')
        .notEmpty().withMessage('Email is Required')
        .isEmail().withMessage('Email must be valid'),
    body('password')
        .notEmpty().withMessage('Password is Required')
]
// Prevents the passwordHash from being sent!
const userSerializer = function (values) {
    const { ...user } = values.dataValues
    delete user.passwordHash
    return user
}

const apiAuthLogin = async function (req, res) {
    const { body: { email, password } } = req

    // Find the user
    let user = await User.findOne({ where: { email } })
    if (!user) return res.status(404).json({ message: `User not found with email: ${email}` })

    // Check if password entered is the same as the one in DB
    const validPassword = await bcrypt.compare(password, user.passwordHash)
    if (!validPassword) return res.status(401).json({ message: 'Credentials is incorrect' })
    console.log(validPassword);
    // Generate a token and set it as cookie
    const token = CryptoJS.AES.encrypt(JSON.stringify(req.body), process.env.TOKEN_SECRET).toString()
    await user.createAuthenticityToken({ token })
    req.session.token = token

    // Prevents the passwordHash from being sent!
    res.status(200).json(userSerializer(user))
}

module.exports = [
    validation,
    checkValidation,
    apiAuthLogin
]