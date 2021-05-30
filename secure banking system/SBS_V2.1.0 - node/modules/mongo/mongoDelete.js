const MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

function mongoDelete(collection, data) {
    // Connection URL
    const url = 'mongodb://localhost:27017/myproject';
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        var col = db.collection(collection);
        // Insert a single document
        col.insertMany(data, function (err, r) {
            assert.equal(null, err);
            assert.equal(3, r.insertedCount);

            // Remove a single document

        });
    });
}