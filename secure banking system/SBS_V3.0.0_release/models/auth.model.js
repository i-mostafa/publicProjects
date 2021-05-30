const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcrypt");

const dbUrl = "mongodb://localhost:27017/sbs";
const userSchema = mongoose.Schema({
    gender: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    balance: Number,
    revenue: Number,
    lastTransaction: Number,
    lastLogin: String,
    status: String,
    timeStamp: String,
    role: String
});

const User = mongoose.model("user", userSchema);

exports.createUser = (firstName, lastName, gender, email, password) => {
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
                return User.findOne({
                    email: email
                });
            })
            .then(user => {
                if (user) {
                    mongoose.disconnect();
                    reject("this email already exists");
                } else {
                    return bcrypt.hash(password, 10);
                }
            })
            .then(encPassword => {
                user = new User({
                    firstName: firstName,
                    lastName: lastName,
                    gender: gender,
                    email: email,
                    password: encPassword,
                    balance: 0,
                    revenue: 0,
                    lastTransaction: 0,
                    lastLogin: 'not yet',
                    status: 'pending',
                    timeStamp: Date.now(),
                    role: 'External User'
                });
                return user.save();
            })
            .then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch(err => {
                console.log(err)
                reject(err);
            });
    });
};

const afterLogin = (id) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            }).then(() => {
                User.findByIdAndUpdate(id, {
                    lastLogin: Date.now()
                }).then(() => {
                    mongoose.disconnect();
                    resolve();
                });
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err)
            })
    })

}

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
                return User.findOne({
                    email: email
                });
            })
            .then(user => {
                if (user) {
                    if (user.status === 'accepted') {
                        bcrypt.compare(password, user.password).then(result => {
                            mongoose.disconnect();
                            if (!result) {
                                reject("wrong password");
                            } else {
                                afterLogin(user._id).then(() => {
                                    mongoose.disconnect();
                                    resolve(user._id);
                                }).catch(err => {
                                    mongoose.disconnect();
                                    reject(err);
                                })
                            }
                        });
                    } else {
                        mongoose.disconnect();
                        reject("your account is under review");
                    }

                } else {
                    mongoose.disconnect();
                    reject("email not found");
                }
            })
            .catch(err => {
                reject(err);
            });
    });
};

exports.checkEmail = (email) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                return User.findOne({
                    email: email
                });
            })
            .then(user => {
                mongoose.disconnect();
                if (user) {
                    resolve()
                } else {
                    reject()
                }
            })
            .catch(err => {
                reject(err);
            });
    });
}
exports.getUserData = (id) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                return User.findById(id).then((user) => {
                    mongoose.disconnect();
                    resolve(user);
                });
            }).catch(err => {
                mongoose.disconnect();
                reject(err)
            })
    })

}

exports.getUsersData = (status) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                return User.find({
                    status: status
                }).then((users) => {
                    mongoose.disconnect();
                    resolve(users);
                });
            }).catch(err => {
                mongoose.disconnect();
                reject(err)
            })
    })

}
exports.postUpdateProfile = (id, data) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            }).then(() => {
                return bcrypt.hash(data.password, 10);
            })
            .then((password) => {
                User.findByIdAndUpdate(id, {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    password: password
                }).then(() => {
                    mongoose.disconnect();
                    resolve();
                });
            }).catch(err => {
                mongoose.disconnect();
                reject(err)
            })
    })

}

exports.afterTranfere = (id, amount, balance) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            }).then(() => {
                User.findByIdAndUpdate(id, {
                    balance: balance - amount,
                    lastTransaction: amount
                }).then(() => {
                    mongoose.disconnect();
                    resolve();
                });
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err)
            })
    })

}

exports.acceptAccount = (id) => {
    return new Promise((resolve, reject) => {
        id = id.replace(/ /g, '');
        mongoose
            .connect(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            }).then(() => {
                User.findByIdAndUpdate(id, {
                    status: 'accepted'
                }).then(() => {
                    mongoose.disconnect();
                    resolve();
                });
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err)
            })
    })

}

exports.deleteAccount = (id) => {
    return new Promise((resolve, reject) => {
        id = id.replace(/ /g, '');
        mongoose
            .connect(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })
            .then(() => {
                console.log(id.length);
                User.deleteOne({
                    _id: id
                }).then(() => {
                    mongoose.disconnect();
                    resolve();
                });
            }).catch(err => {
                mongoose.disconnect();
                reject(err)
            })
    })
}