const MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

function mongoCareate(collection, data) {
    const url = 'mongodb://localhost:27017/sbs';
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        // Insert a single document
        db.collection(collection).insertOne(data, {
            w: 'majority',
            wtimeout: 10000,
            serializeFunctions: true
        }, function (err, r) {
            assert.equal(null, err);
            assert.equal(1, r.insertedCount);
            db.close();
        });
    });
}
// Connection URL