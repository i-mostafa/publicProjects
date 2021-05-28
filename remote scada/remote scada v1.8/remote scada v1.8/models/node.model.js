const NodeModel = require("./dbmodels/node.model");
dbUrl = "mongodb://localhost:27017/scada";
const mongoose = require("mongoose");
exports.addBureRecordToDb = (dbModel, query) => {
	return new Promise((resolve, reject) => {
		mongoose
			.connect(dbUrl, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
			})
			.then(() => {
				return dbModel.create(query);
			})
			.then((result) => {
				//MetatraderAccountsModel
				resolve(result);
			})
			.catch((err) => {
				console.log(err);
				//MetatraderAccountsModel
				reject(err);
			});
	});
};

exports.getFilteredData = (dbModel, query = {}, sortQuery = {}, limitVal = 0) => {
	return new Promise((resolve, reject) => {
		this.getAllFromDB(dbModel, query, sortQuery, limitVal)
			.then((result) => {
				resolve(result);
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
};

exports.getAllFromDB = (dbModel, query = {}, sortQuery = {}, limitVal = 0) => {
	return new Promise((resolve, reject) => {
		mongoose
			.connect(dbUrl, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
			})
			.then(() => {
				return dbModel.find(query).sort(sortQuery).limit(limitVal);
			})
			.then((result) => {
				resolve(result);
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
};

exports.updateOneInDB = (dbModel, query = {}, update) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            })
            .then(() => {
                return dbModel.findOneAndUpdate(query, update);
            })
            .then((nodeData) => {
                resolve(nodeData);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
};