const express = require("express");
const bcrypt = require("bcrypt");
// index -> db.User
const { User } = require("../models");
const router = express.Router();

// Post /user
router.post("/", async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디 입니다.");
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
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
