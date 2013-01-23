#nodejs-mongodb-api

Here's a super simple drop-in API template for Node.js. I've released this for a couple of use cases:

* You're a Node.js beginner and you're interested in seeing how a simple REST API might look.
* You need a quick project skeleton for a hack-day.

## Usage

Clone this repo to a new project directory. You may also want to run `rm -rf .git` and then `git init` from within your project directory so Git doesn't try to push your new project to this repo!

You'll need a few dependencies to use this, so run this on your command line within your project directory to get the tools you need:

`npm install`

You'll also need MongoDB running.

## Notes

For now, you'll need to make sure any request is submitted with the `Content-Type: application/json;` HTTP header.

In `example-route.js`, you'll notice `var queryType` appears multiple times and is passed as the 2nd argument to each function in `db.js`.

If your request URL is `http://www.example.com/api/v1/things`, `queryType` will be set to `things` (as this is your API endpoint) and this will be the collection name passed to MongoDB. Consequently, _every API endpoint maps to a MongoDB collection with the same name_.

Wherever an ID is needed (e.g. when making a GET request), this maps to the MongoDB ObjectID of the document. For example: `http://www.example.com/api/thing/1/50dc6fd62956950000000001`.

## Feedback?

It's far from complete or perfect. I welcome and encourage any and all (constructive) feedback on my code. If you have suggestions or improvements, please submit a pull request!