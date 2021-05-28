exports.isAuth = (req, res, next) => {
  if (req.session.userId) {
    console.log(req.session.userId);
    next();
  } else res.redirect("/login");
};
exports.isAdmin = (req, res, next) => {
  if (req.session.role === "Admin") {
    console.log(req.session);
    next();
  } else if (req.session.role === "User") {
    res.redirect("/");
  } else res.redirect("/login");
};
exports.isUser = (req, res, next) => {
  console.log(req.session.role);
  if (req.session.role === "User") {
    next();
  } else if (req.session.role === "Admin") {
    res.redirect("/");
  } else res.redirect("/login");
};

exports.isNotAuth = (req, res, next) => {
  if (!req.session.userId) next();
  else res.redirect("/");
};
