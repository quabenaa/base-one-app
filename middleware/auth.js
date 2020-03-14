require("dotenv").config();
const JWTstrategy = require("passport-jwt").Strategy;
//Extract the JWT sent by the user
const ExtractJWT = require("passport-jwt").ExtractJwt;

//This verifies that the token sent by the user is valid
module.exports = function(passport) {
  passport.use(
    new JWTstrategy(
      {
        //secret we used to sign our JWT
        secretOrKey: process.env.SECRET,
        //we expect the user to send the token as a query paramater with the name 'secret_token'
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      },
      async (payload, done) => {
        try {
          //Pass the user details to the next middleware
          return done(null, payload);
        } catch (error) {
          console.log(token);
          done(error);
        }
      }
    )
  );
};
