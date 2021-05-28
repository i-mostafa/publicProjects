const dbUrl = "mongodb://localhost:27017/scada";
const NodeModel = require("./dbmodels/node.model");
const nodeModel = require("./node.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

exports.createUser = (dbModel, UserData) => {
  const query = {
    userName: userData.userName,
  };
  return new Promise((resolve, reject) => {
    mongoose
      .connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        return dbModel.findOne(query);
      })
      .then((user) => {
        if (!user) {
          return bcrypt.hash(UserData.password, 10);
        } else {
          reject("User name already exists");
          throw new Error("User name already exists");
        }
      })
      .then((hash) => {
        UserData.password = hash;
        return dbModel.create(UserData);
      })
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        console.log(err);
        reject("error while creating User", err);
      });
  });
};

exports.checkUserExists = (dbModel, loginData) => {
  return new Promise((resolve, reject) => {
    nodeModel
      .getFilteredData(dbModel, { userName: loginData.userName })
      .then((user) => {
        if (user) {
          userData = user[0];
          console.log(user);
          return bcrypt.compare(loginData.password, userData.password);
        } else {
          reject("wrong email address");
        }
      })
      .then((result) => {
        if (result) {
          resolve(userData);
        } else {
          reject("wrong password");
        }
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.createNewPassword = (dbModel, token, pass) => {
  // TODO check token for real pass
  query = {
    resetToken: token,
  };
  return new Promise((resolve, reject) => {
    mongoose
      .connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        return bcrypt.hash(pass, 10);
      })
      .then((encPass) => {
        console.log(query);
        return userModel.updateOneInDB(dbModel, query, {
          password: encPass,
          resetToken: null,
        });
      })
      .then((User) => {
        //mongoose.disconnect();
        console.log(User);
        resolve(User);
      })

      .catch((err) => {
        //mongoose.disconnect();
        console.log(err);
        reject(err);
      });
  });
};
exports.changePassword = (dbModel, userName, cpassword, password) => {
  // TODO check token for real pass
  let userData;
  query = {
    userName: userName,
  };
  return new Promise((resolve, reject) => {
    mongoose
      .connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        return nodeModel.getFilteredData(dbModel, query);
      })
      .then((user) => {
        userData = user[0];
        return bcrypt.compare(cpassword, userData.password);
      })
      .then((state) => {
        if (state) return bcrypt.hash(password, 10);
        else {
          reject("Wrong password");
          throw new Error("Wrong password");
        }
      })
      .then((encPass) => {
        console.log(query);
        return nodeModel.updateOneInDB(dbModel, query, { password: encPass });
      })
      .then((User) => {
        //mongoose.disconnect();
        console.log(User);
        resolve("password changed successfully");
      })

      .catch((err) => {
        //mongoose.disconnect();
        // console.log(err);
        reject("error when changing password");
      });
  });
};
