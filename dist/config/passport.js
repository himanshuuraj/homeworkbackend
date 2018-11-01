"use strict";

var _config = require("./config");

var JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt,
    mongoose = require("mongoose");
//UserDetails = mongoose.model("UserDetails");
var UserDetails = require("./../models/parent");
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = _config.key;
// opts.issuer = "accounts.examplesoft.com";
// opts.audience = "yoursite.net";
// passport.use(
//   new JwtStrategy(opts, function(jwt_payload, done) {
//     User.findOne({ id: jwt_payload.sub }, function(err, user) {
//       if (err) {
//         return done(err, false);
//       }
//       if (user) {
//         return done(null, user);
//       } else {
//         return done(null, false);
//         // or you could create a new account
//       }
//     });
//   })
// );

module.exports = function (passport) {
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    console.log(jwt_payload);
    UserDetails.findOne({ id: jwt_payload.email }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  }));
};