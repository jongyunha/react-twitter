module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    "Hashtag",
    {
      name: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      // user model setting
      charset: "utf8mb4", // 이모티콘을 사용하기위해서
      collate: "utf8bm4_general_ci", // 한글 저장
    }
  );
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post);
  };
  return Hashtag;
};
