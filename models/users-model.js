const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    birthDate: {
        type: Date
    },
    createAt: {
        type: Date,
        default: new Date()
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    firstName: {
        type: String,
        trim:true
    },
    id: {
        type: String,
    },
    lastName: {
        type: String,
        trim:true

    },
    password: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ['CONSUMER', 'ADMIN', 'GUEST', 'SELLER'],
        default: 'CONSUMER'
    },
    updatedAt: {
        type: Array
    },
    cart: {
        type: Object,
        default: {
            products: [],
            totalQuantity: 0,
            totalPrice: 0
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, 'token')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}



let User = mongoose.model('user', userSchema);

module.exports = User;
