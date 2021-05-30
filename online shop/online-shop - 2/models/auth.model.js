const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcrypt");
const bodyParserMW = require("body-parser").urlencoded({
    extended: true
});

const dbUrl = "mongodb://localhost:27017/online-shoping";
const userSchema = mongoose.Schema({
    email: String,
    userName: String,
    password: String
});

const User = mongoose.model("user", userSchema);

exports.createUser = (userName, email, password) => {
    // connect to db
    // check if  email already exists
    // reject if exists store if not
    return new Promise((resolve, reject) => {
        mongoose
            .connect(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                return User.findOne({ email: email });
            })
            .then((user) => {
                if (user) {
                    console.log(user);
                    mongoose.disconnect();
                    reject("this email already exists");
                } else {
                    return bcrypt.hash(password, 10);
                }
            })
            .then((encPassword) => {
                user = new User({
                    userName: userName,
                    email: email,
                    password: encPassword
                });
                return user.save();
            })
            .then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
};

exports.checkUser = (email, password) => {
    // find user with email matched
    // if not reject
    // if found hass pasword and comapaire passwords
    //set session id
    return new Promise((resolve, reject) => {
        mongoose
            .connect(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                return User.findOne({ email: email });
            })
            .then((user) => {
                if (user) {
                    bcrypt.compare(password, user.password).then((result) => {
                        mongoose.disconnect();
                        if (!result) {
                            reject("wrong password");
                        } else {
                            resolve(user._id);
                        }
                    });
                } else {
                    mongoose.disconnect();
                    reject("email not found");
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
};
