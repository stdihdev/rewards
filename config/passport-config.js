const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

const config = require('./index');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.data.auth.secret,
};

passport.use(new Strategy(opts, (payload, done) => {

    if(payload.e_code === config.data.auth.eCode ) {
        return done(null, true);
    } else {
        return done(null, false);
    }

}));