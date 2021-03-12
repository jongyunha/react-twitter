module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      src: {},
    },
    {
      // user model setting
      charset: "utf8",
      collate: "utf8_general_ci", // 한글 저장
    }
  );
  Image.associate = (db) => {
    return Image;
  };
};
