const passport = require('passport');
const bcrypt = require('bcrypt');
// 파이썬에서 import numpy as np 와 동일하게 구조분해 할때 변수명을 바꾸는 문법
const { Strategy: LocalStrategy } = require('passport-local');
const { User } = require('../models');
module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({
            where: { email: email },
          });
          if (!user) {
            // 서버에러, 성공, 클라이언트 에
            return done(null, false, {
              reason: '존재하지 않는 이메일 입니다.',
            });
          }
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            // 성공 했으니깐 사용자 정보 넘겨주기
            return done(null, user);
          }
          return done(null, false, { reason: '비밀번호가 틀렸습니다.' });
        } catch (error) {
          // 서버 에러 났을 경우
          console.error(error);
          return done(error);
        }
      },
    ),
  );
};
