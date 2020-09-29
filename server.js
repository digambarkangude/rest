const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 8000;
const book = require('./app/routes/book');
const config = require('config');

let options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

mongoose.connect(config.DBHost, options);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));

// Dont show logs on dev env
if (config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(morgan('combined'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.get("/", (req, res) = > res.json({ message: "Welcome to our bookstore!" }));

app.route('/book')
    .get(book.getBooks)
    .post(book.postBook);

app.route("/book/:id")
    .get(book.getBook)
    .get(book.deleteBook)
    .get(book.updateBook);

app.listen(port);

console.log(`Listening on port ${port}`);

module.exports = app;