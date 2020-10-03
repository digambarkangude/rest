//Set environment to test
process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Book = require('../controllers/models/book');

//Dev dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Main block
describe('Books', () => {
  beforeEach((done) => { //Before each test we empty the database
    Book.deleteMany({}, (err) => {
      done();
    });
  });
  /*
    * Test the /GET route
    */
  describe('/GET book', () => {
    it('it should GET all the books', (done) => {
      chai.request(server)
        .get('/book')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  /*
  *Test the /POST route
  */
  describe('/POST book', () => {
    it('It Should not POST a book without isbn field', (done) => {
      let book = {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
      }
      chai.request(server)
        .post('/book')
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('isbn');
          res.body.errors.isbn.should.have.property('kind').eql('required');
          done();
        });
    });
    it('It should POST a book', (done) => {
      let book = {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        isbn: "ISB15SDIFSF4545S",
      }
      chai.request(server)
        .post('/book')
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Book added successfully!');
          res.body.book.should.have.property('title');
          res.body.book.should.have.property('author');
          res.body.book.should.have.property('isbn');
          done();
        });
    });
  });

  /*
  *Test /GET/:id route
  */
  describe('/GET/:id book', () => {
    it('It should get a book by id', (done) => {
      let book = new Book({
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        isbn: "ISB15SDIFSF4545S",
      });
      book.save((err, book) => {
        chai.request(server)
          .get(`/book/${book.id}`)
          .send(book)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title');
            res.body.should.have.property('author');
            res.body.should.have.property('isbn');
            res.body.should.have.property('_id').eql(book.id);
            done();
          });
      });
    });
  });

  /*
  *Test the /PUT/:id route
  */

  describe('/PUT/:id book', () => {
    it('It should update book by given id', (done) => {
      let book = new Book({
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        isbn: "ISB15SDIFSF4545S",
      });
      book.save((err, book) => {
        chai.request(server)
          .put(`/book/${book.id}`)
          .send({
            title: "The Lord of the Rings",
            author: "J.R.R. Tolkien",
            isbn: "1111111111",
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Record updated successfully!');
            res.body.book.should.have.property('isbn').eql('1111111111');
            done();
          });
      });
    });
  });

  /*
  *Test /DELETE/:id route
  */
  describe('/DELETE/:id book', () => {
    it('It should delete book by ID', (done) => {
      let book = new Book({
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        isbn: "1111111111",
      });
      book.save((err, res) => {
        chai.request(server)
          .delete(`/book/${book.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Book deleted successfully!');
            res.body.result.should.have.property('ok').eql(1);
            res.body.result.should.have.property('n').eql(1);
            done();
          });
      });
    });
  });
});