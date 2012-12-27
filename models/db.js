var mongodb = require('mongodb'),
    mongoserver = new mongodb.Server('localhost', 27017),
    instance = new mongodb.Db('YOUR-DB-NAME-HERE', mongoserver, {safe : true}),
    ObjectID = require('mongodb').ObjectID;

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
  instance.open(function (err, db) {
    if (err) {
      callback(err);
    }
    db.collection(queryType, function (err, collection) {
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
        instance.close();
      });
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
  instance.open(function (err, db) {
    if (err) {
      callback(err);
    }
    db.collection(queryType, function (err, collection) {
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
        instance.close();
      });
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
  instance.open(function (err, db) {
    if (err) {
      callback(err);
    }
    db.collection(queryType, function (err, collection) {
      if (err) {
        callback(err);
      }
      collection.find({}, {limit : parseInt(query, 10)}).toArray(function (err, result) {
        if (err) {
          callback(err);
        }
        else {
          callback(null, result);
        }
        instance.close();
      });
    });
  });
};