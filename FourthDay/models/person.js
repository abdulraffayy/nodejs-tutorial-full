const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zip: {
            type: String,
            required: true
        }
    },
    salary: {
        type: Number,
        required: true,
        min: 0
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// hash Password Field
personSchema.pre('save', async function (next) {
    const person = this;
    // hash the password only if hs been modified (or New )

    if(!person.isModified("password")) return  next()
    try {

        const salt = await bcrypt.genSalt(10);

        // hash password

        const hashPassword = await  bcrypt.hash(person.password, salt);
        person.password = hashPassword;
        next();
        // hash passowrd Error
    }
    catch (err) {
        next(err);
    }
})


personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        console.error(err);
        throw new Error("Server Error");
    }
}



const Person = mongoose.model('Person', personSchema);

module.exports = Person;
