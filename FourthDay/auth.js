// authentication use of a code we use it 

const passport = require('passport');
const Person = require('./models/person.js');

const LocalStrategy = require('passport-local').Strategy


passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        console.log("Received Credentials:", username, password);

        const user = await Person.findOne({ username });
        if (!user) {
            return done(null, false, { message: 'Incorrect username or password' });
        }

        const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect username or password' });
        }

    } catch (error) {
        console.error(error);
        return done(error);
    }
}));




module.exports  = passport