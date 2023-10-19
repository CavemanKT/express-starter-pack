const bcrypt = require("bcryptjs")
const { body } = require('express-validator')

const { User } = require('../../../models')
const { checkValidation } = require('../../_helpers')

const permittedSignupParams = ['email', 'passwordHash']

const validation = [
    body('email')
        .notEmpty().withMessage('Email is Required')
        .isEmail().withMessage('Email must be valid')
        .custom(async function (email) {
            if (email) {
                const user = await User.findOne({ where: { email } })
                if (user) return Promise.reject()
            }
        }).withMessage('Email already in use'),
    body('password')
        .notEmpty().withMessage('Password is Required')
        .isLength({ min: 6 }).withMessage('Password must be longer or equal to 6 characters')
]

// Prevents the passwordHash from being sent!
const userSerializer = function (values) {
    const { ...user } = values.dataValues
    delete user.passwordHash
    return user
}

const apiAuthSignup = async function (req, res) {
    const { body: userParams } = req
    console.log(userParams);
    let result
    // Build a new user
    let user = await User.build(userParams, { attributes: permittedSignupParams })
    // Set the passwordHash with the hashed password with 10 rounds of salting
    await bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err
        bcrypt.hash(userParams.password, salt, async (err, hash) => {
            if (err) throw err
            user.passwordHash = hash
            // Saves the user
            result = await user.save()
            console.log(result.dataValues);
        })
    })

    res.status(200).json(userSerializer(user))
}

module.exports = [
    validation,
    checkValidation,
    apiAuthSignup
]