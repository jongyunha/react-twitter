module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      // user model setting
      charset: "utf8",
      collate: "utf8bm4_general_ci", // 한글 저장
    }
  );
  Comment.associate = (db) => {
    return Comment;
  };
};
