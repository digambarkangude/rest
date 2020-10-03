let mongoose = require('mongoose');
let Book = require('../models/book');
const { bookSchema } = require('../../helpers/validation_schema');
/*
*GET book route for getting all the books
*/
function getBooks(req, res) {
  let query = Book.find({})
  query.exec((err, books) => {
    if (err)
      res.send(err);
    res.json(books);
  });
}
/*
*POST
*/
 function postBook(req, res) {
  // const result = await bookSchema.validateAsync(req.body);
  // console.log('result----->>', result);
  let newBook = new Book(req.body);
  newBook.save((err, book) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send({ message: "Book added successfully!", book });
    }
  });
}
/*
*GET book by ID
*/
function getBook(req, res) {
  Book.findById(req.params.id, (err, book) => {
    if (err)
      res.send(err);
    res.json(book);
  });
}
/*
*DELETE
*/
function deleteBook(req, res) {
  Book.deleteMany({ _id: req.params.id }, (err, result) => {
    if (err)
      res.send(err);
    res.json({ message: 'Book deleted successfully!', result })
  })
}
/*
*PUT
*/
function updateBook(req, res) {
  Book.findById({ _id: req.params.id }, (err, book) => {
    if (err) res.send(err);
    Object.assign(book, req.body).save((err, book) => {
      if (err) res.send(err)
      res.json({ message: 'Record updated successfully!', book });
    })
  })
}

module.exports = { getBook, getBooks, postBook, deleteBook, updateBook };