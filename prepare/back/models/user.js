module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
        unique: true,
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, // 필수
      },
    },
    {
      // user model setting
      charset: "utf8mb4", // 이모티콘을 사용하기위해서
      collate: "utf8bm4_general_ci", // 한글 저장
    }
  );
  User.associate = (db) => {
    return User;
  };
};
