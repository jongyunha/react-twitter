const express = require('express');
const { Post, Image, Comment, User } = require('../models');
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
          include: {
            model: User, // 댓글 작성자
            attributes: ['id', 'nickname'],
          },
        },
        {
          model: User, // 게시글 작성자
          attributes: ['id', 'nickname'],
        },
        {
          model: User, // 좋아요 누른 사람 구분 해주기 위해서 as 를 가져와서 사용
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });

    res.status(201).json(fullPost);
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
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: {
        model: User,
        attributes: ['id', 'nickname'],
      },
    });

    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// patch /post/1/like
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) return res.status(403).send('존재하지 않는 게시물 입니다.');
    // models post.js 를 참고
    // db 를 조작할땐 await 를 붙여주기 비동기
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Delete /post/1/like
router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) return res.status(403).send('존재하지 않는 게시물 입니다.');
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    // sequelize 문법의 파괴하다 제거하다 destroy
    const postId = parseInt(req.params.postId);
    await Post.destroy({
      where: { id: postId, UserId: req.user.id },
    });
    res.json({ PostId: postId });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
