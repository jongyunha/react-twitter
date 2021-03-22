module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      // user model setting
      charset: 'utf8mb4', // 이모티콘을 사용하기위해서
      collate: 'utf8mb4_general_ci', // 한글 저장
    },
  );
  Post.associate = (db) => {
    // db 의 관계 가 생성되는데 복수 와 단수로 구분됩니다.
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); // 다대다 관계일때는 belongsToMany
    db.Post.hasMany(db.Comment); // Post.addComments, Post.getComments, Post.setComments (추가하고, 가져오고, 수정하고)
    db.Post.hasMany(db.Image); // Post.addImages
    // 나중에 as 에 따라서 post.getLikers 처럼 게시글 좋아요 누른 사람을 가져오게 됩니다.
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }); // Post.addLikers
    // Retweet 을 염두
    db.Post.belongsTo(db.Post, { as: 'Retweet' }); // Post.addRetweet
  };
  return Post;
};
