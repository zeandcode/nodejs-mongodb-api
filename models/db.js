var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ObjectID = require('mongodb').ObjectID;

var CONSTRING = 'mongodb://YOUR-DOMAIN:YOUR-PORT/YOUR-DB-NAME';

/*
 *
 * exports.getOneAndReturn(query, queryType, callback)
 *
 * Gets a single document from a database.
 *
 * The function will pass a document {object} as a second argument to the
 * callback should the DB call be successful.
 *
 */

exports.getOneAndReturn = function (query, queryType, callback) {
  var formedQuery = {
    "_id" : new ObjectID.createFromHexString(query)
  };
  MongoClient.connect(CONSTRING, function (err, db) {
    var collection = db.collection(queryType);
    if (err) {
      callback(err);
    }
    collection.findOne(formedQuery, function (err, doc) {
      if (err) {
        callback(err);
      }
      else {
        // Casting doc['_id'] to string here prevents wierdness during testing
        doc['_id'] = doc['_id'].toString();
        callback(null, doc);
      }
    });
  });
};

/*
 *
 * exports.postAndReturn(post, queryType, callback)
 *
 * Post a single document to a database.
 *
 * The function will pass the created document {object} as a second argument
 * to the callback should the DB call be successful.
 *
 */

exports.postAndReturn = function (post, queryType, callback) {
  MongoClient.connect(CONSTRING, function (err, db) {
    var collection = db.collection(queryType);
    if (err) {
      callback(err);
    }
    collection.insert(post, {safe : true}, function (err, result) {
      if (err) {
        callback(err);
      }
      else {
        // Casting doc['_id'] to string here prevents wierdness during testing
        result[0]['_id'] = result[0]['_id'].toString();
        callback(null, result[0]);
      }
    });
  });
};

/*
 *
 * exports.getSelection(query, queryType, callback)
 *
 * Gets an array of results of predefined length from the database.
 *
 * The function will pass an [array] as a second argument
 * to the callback should the DB call be successful.
 *
 */

exports.getSelection = function (query, queryType, callback) {
  MongoClient.connect(CONSTRING, function (err, db) {
    var collection = db.collection(queryType);
    if (err) {
      callback(err);
    }
    console.dir(collection);
    collection.find({}, {limit : parseInt(query, 10)}).toArray(function (err, result) {
      if (err) {
        callback(err);
      }
      else {
        callback(null, result);
      }
    });
  });
};