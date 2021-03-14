const express = require("express");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");
const app = express();
const port = 3065;

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.log("error"));

// req.body 를 사용하려면 아래와 같이 적어줘야합니다.
// 프론트에서 보낸 데이터를 req.body 안에 넣어주는 역활을 합니다!
// use 안에 들어가는것들을 middleware 라고 합니다.
// middleware 들의 순서를 알맞게 배치하는것도 중요합니다.
app.use(express.json()); // json 형식으로 보냈을때 req.body 에 추가해줌
app.use(express.urlencoded({ extended: true })); // form submit 형식으로 보냈을때 req.body 에 추가해줌

// app.get -> 가져오다
// app.post -> 생성하다
// app.put -> 전체 수정
// app.delete -> 제거
// app.patch -> 부분 수정
// app.options -> 찔러보기 (나 요청 보낼수 있어?)
// app.head -> 헤더만 가져오기 (헤더 / 바디)

app.get("/", (req, res) => {
  res.send("hello express");
});

app.get("/api", (req, res) => {
  res.send("hello api");
});

app.get("/api/posts", (req, res) => {
  res.json([
    { id: 1, content: "hello" },
    { id: 2, content: "hello2" },
    { id: 3, content: "hello3" },
  ]);
});

app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`localhost:${port} 에서 실행중`);
});
