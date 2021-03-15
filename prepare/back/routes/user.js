const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');

// index -> db.User
const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

// Post /user/login
// middleware 확장
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    // passport 에서 req.login 으로 로그인 할 수 있게 허락합니다.
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        // attributes 를 통해서 원하는 정보만 받을 수 있습니다.
        // attributes: ['id', 'email', 'nickname'],
        // 위와 동일한 문법으로 비밀번호를 제외한 것만 가져오겠다.
        attributes: {
          exclude: ['password'],
        },
        // include 를 해주게 되면 user.id 에 해당되는 post , follow, follower 를 가져옵니다.
        include: [
          {
            // hashMany 라서 model: Post 가 복수형이 되어 me.Posts 가 됩니다.
            model: Post,
          },
          {
            model: User,
            as: 'Followings',
          },
          {
            model: User,
            as: 'Followers',
          },
        ],
      });
      // 사용자 정보를 프론트로 넘겨주기
      // res.setHeader('Cookie', 'cxlhy')
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

// Post /user
router.post('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디 입니다.');
    }
    // bcrypt 도 비동기 이기때문에 await 를 붙여줘야합니다.
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      // sagas/user signUpApi -> data 가 req.body 로 받습니다.
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    // cors error 해결하는 방법
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3060");
    // 이렇게 직접 적어 줘도 되지만 보통은 미들웨어를 사용합니다. npm i cors
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/logout', isLoggedIn, (req, res, next) => {
  // 로그인한 사람의 정보가 들어있습니다.
  console.log(req.user);
  req.logout();
  req.session.destroy();
  res.send('ok');
});

module.exports = router;
