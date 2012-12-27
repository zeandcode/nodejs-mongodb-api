#nodejs-mongodb-api

Here's a super simple drop-in API template for Node.js.

## Usage

Clone this repo to a new project directory. You may also want to run `rm -rf .git` and then `git init` from within your project directory so Git doesn't try to push your new project to this repo!

You'll need a few dependencies to use this, so run this on your command line within your project directory to get the tools you need:

`npm install`

You'll also need MongoDB running.

## Notes

For now, you'll need to make sure any request is submitted with the `Content-Type: application/json;` HTTP header.

In `example-route.js`, you'll notice `var queryType` appears multiple times and is passed as the 2nd argument to each function in `db.js`.

If your request URL is `http://www.example.com/api/thing/1/`, `queryType` will be set to `thing` (as this is your API endpoint) and this will be the collection name passed to MongoDB. Consequently, _every API endpoint maps to a MongoDB collection with the same name_.

Wherever an ID is needed (e.g. when making a GET request), this maps to the MongoDB ObjectID of the document. For example: `http://www.example.com/api/thing/1/50dc6fd62956950000000001`.

## Feedback?

It's far from complete or perfect. I welcome and encourage any and all (constructive) feedback on my code. If you have suggestions or improvements, please submit a pull request!