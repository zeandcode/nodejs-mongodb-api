var db = require('../models/db');

exports.getThing = function (req, res) {
  var queryType = req.route.path.replace('/','').split("/")[1];
  console.log(queryType);
  db.getOneAndReturn(req.params.id, queryType, function (err, result) {
    if (err) {
      res.send(500, 'API Error: ' + err.toString());
    }
    else {
      res.send(200, result);
    }
  });
};

exports.postThing = function (req, res) {
  if (req.body) {
    if (req.headers['content-type'].indexOf('application/json') === -1) {
      res.send(400, 'API Error: We only accept requests with MIME type application/json');
    }
    else {
      var queryType = req.route.path.replace('/','').split("/")[1];
      db.postAndReturn(req.body, queryType, function (err, newEntry) {
        if (err) {
          res.send(500, 'API Error: ' + err.toString());
        }
        else {
          res.send(201, newEntry);
        }
      });
    }
  }
  else {
    res.send(400, 'API Error: No request.');
  }
};

exports.listThing = function (req, res) {
  if (req.query.q) {
    var queryType = req.route.path.replace('/','').split("/")[1];
    db.getSelection(req.query.q, queryType, function (err, result) {
      if (err) {
        res.send(500, 'API Error: ' + err.toString());
      }
      else {
        res.send(200, result);
      }
    });
  }
  else {
    res.send(400, 'API Error: We need a query string with the number of results you want back, e.g. /jobs/?q=5');
  }
};

// There's no mappings for HTTP DELETE or PUT yet :(
// Care to add one? Send me a pull request!