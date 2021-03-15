exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    // next 는 사용방법이 두개인데 어떠한 인자라도 있으면 error 로 보고 error 처리합니다.
    // 인자가 아무것도 없다면 다음으로 넘어갑니다.
    next();
  } else {
    res.status(401).send('로그인이 필요합니다.');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그인하지 않은 사용자만 접근 가능합니다.');
  }
};
