const User = require("../Models/user.modal");
const express = require("express");
const OauthRouter = express.Router();
const passport = require("passport");
const { Strategy} = require("passport-google-oauth20");

const {
  GOOGLE_CLIENTID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
} = require("../Config/Config");
passport.use(
  new Strategy(
    {
      clientID:GOOGLE_CLIENTID,
      clientSecret:GOOGLE_CLIENT_SECRET,
      callbackURL:GOOGLE_CALLBACK_URL,
      scope:["profile","email"]
    },
    async function name(accessToken, refreshToken, profile, done) {
        let user = await User.findOne({email:profile.emails[0].value})
        if(!user){
            user = await User.create({
                email:profile.emails[0].value,
                profile_image:profile.photos[0].value,
                username:profile.displayName,
                password:profile.id,
                authType:"google",
                isVerified:true,
            })
        }
        return done(null,user)
    }
  )
);
passport.serializeUser(function(user,done){
    done(null,user)
})
passport.deserializeUser(function(user,done){
    done(null,user)
})
OauthRouter.get("/google",passport.authenticate("google",{scope:["profile","email"]}))
OauthRouter.get("/google/callback",passport.authenticate("google",{failureRedirect:"/login"}),function(request,resposne){
    request.session.user = request.user;
    resposne.status(200).json({
      status:"success",
      user:request.user
    })
})

module.exports = OauthRouter