module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      // user model setting
      charset: "utf8mb4", // 이모티콘을 사용하기위해서
      collate: "utf8bm4_general_ci", // 한글 저장
    }
  );
  Post.associate = (db) => {
    return Post;
  };
};
