const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    // 세션에 무겁지 않게 유저 아이디만 저장합니다.
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      // id 만을 통해서 유저 정보를 복구
      const user = await User.findOne({ where: { id: id } });
      done(null, user); // req.user 안에 user 정보를 넣어줍니다.
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
