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
      collate: "utf8mb4_general_ci", // 한글 저장
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    // 별칭을 지어주실때는 대문자로 시작하는게 좋습니다!!!
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
    // through 는 테이블이름 을 변경하는 것이고 foreignKey 는 change the table name
    // 같은 테이블일때는 foreignKey 가 들어갑니다. foreignKey 는 먼저 찾아야하는 키를 적어야합니다.
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId",
    });
  };
  return User;
};
