module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    // UserId: 1
    // PostId: 3
    {
      // user model setting
      charset: "utf8",
      collate: "utf8bm4_general_ci", // 한글 저장
    }
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
  };
  return Comment;
};
