const UserModel = require("../models/dbmodels/user.model");
const nodeModel = require("../models/node.model");
const authModel = require("../models/auth.model");

exports.addNewUser = (req, res, next) => {
  userData = {
    userName: req.body.userName,
    password: req.body.password,
    role: req.body.role,
    nodeId: req.session.nodeId,
  };
  authModel
    .createUser(UserModel, userData)
    .then((user) => {
      console.log(user);
      res.redirect("/");
    })
    .catch(res.redirect("/createUser"));
};

exports.login = (req, res, next) => {
  let loginData = {
    userName: req.body.userName,
    password: req.body.password,
  };
  console.log(loginData);
  authModel
    .checkUserExists(UserModel, loginData)
    .then((user) => {
      req.session.userId = user._id;
      req.session.role = user.role;
      req.session.userName = user.userName;
      req.session.lastLogin = user.lastLogin;
      nodeModel.updateOneInDB(
        UserModel,
        { _id: user._id },
        { lastLogin: Date.now() }
      );
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/login");
    });
};

exports.currentUsers = (req, res, next) => {
  nodeModel.getFilteredData(UserModel).then((users) => {
    res.render("currentUsers", {
      users: users,
      role: req.session.role,
      userName: req.session.userName,
    });
  });
};

exports.changePassword = (req, res, next) => {
  authModel
    .changePassword(
      UserModel,
      req.session.userName,
      req.body.cPassword,
      req.body.newpassword
    )
    .then((user) => {
      console.log(user);
      res.redirect("/changePassword");
    });
};
