const express = require("express");

const app = express();
const port = 3065;

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

app.post("/api/post", (req, res) => {
  res.json({ id: 1, content: "hello" });
});

app.post("/api/post", (req, res) => {});

app.delete("/api/post", (req, res) => {
  res.json({ id: 1 });
});

app.listen(port, () => {
  console.log(`localhost:${port} 에서 실행중`);
});