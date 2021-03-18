const express = require('express');
const { Post, Image, Comment } = require('../models');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();
// POST /post
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      // 로그인이 되어 있기 때문에 req.user.id 에 들어있습니다.
      UserId: req.user.id,
    });
    // 정보를 완성해서 frontEnd 로 전달하기
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
        },
        {
          model: User,
        },
      ],
    });

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Post /post/1/comment 주소부분에서 동적으로 바뀌는 부분을 파라미터 라고합니다.
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) return res.status(403).send('존재하지 않는 게시글 입니다.');
    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id,
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /post
router.delete('/', (req, res) => {
  res.json({ id: 1 });
});

module.exports = router;
