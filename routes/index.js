var fs = require('fs');

// I send static HTML to the client like this.
// Please create a GitHub issue or submit a pull req if you know of a better way. :)

exports.home = function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var contents = fs.readFileSync("./views/index.html", "UTF-8");
  res.end(contents);
};

// ...or if I'm using Jade templates, it's just this.

exports.moreContent = function (req, res) {
  res.render('results');
};

