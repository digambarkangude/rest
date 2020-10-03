const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 8000;
const book = require('./controllers/routes/book');
const config = require('config');
mongoose.connect(config.DBHost, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));

// Dont show logs on dev env
if (config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(morgan('combined'));
}

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.get("/", (req, res) => res.json({ message: "Welcome to our bookstore!" }));

app.route('/book')
    .get(book.getBooks)
    .post(book.postBook);

app.route("/book/:id")
    .get(book.getBook)
    .delete(book.deleteBook)
    .put(book.updateBook);

app.listen(port);

console.log(`Listening on port ${port}`);

module.exports = app;