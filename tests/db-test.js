var chai = require('chai'),
    should = chai.should();

var db = require('../models/db');

var fixtures = {
  post: {
    'title': 'Creative Director'
  },
  id: '',
  queryType: 'jobs'
};

describe('postAndReturn', function () {
  it('should return an object, with property _id', function (done) {
    db.postAndReturn(fixtures.post, fixtures.queryType, function (err, newEntry) {
      should.not.exist(err);
      should.exist(newEntry);
      newEntry.should.be.an('object');
      newEntry.should.have.property('_id');
      fixtures.id = newEntry['_id'];
      done();
    });
  });
});

describe('getOneAndReturn', function () {
  it('should return an object with an _id', function (done) {
    db.getOneAndReturn(fixtures.id, fixtures.queryType, function (err, result) {
      should.not.exist(err);
      should.exist(result);
      result.should.be.an('object');
      result.should.have.property('_id');
      done();
    });
  });
  it('should return an _id equal to fixtures.id', function (done) {
    db.getOneAndReturn(fixtures.id, fixtures.queryType, function (err, result) {
      should.not.exist(err);
      should.exist(result);
      result['_id'].should.equal(fixtures.id);
      done();
    });
  });
});

