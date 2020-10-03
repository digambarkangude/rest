const joi = require('joi');

const bookSchema = joi.object({
    title: joi.string().required(),
    author: joi.string().required(),
    isbn: joi.string().required(),
    releaseDate: joi.required()
});

module.exports = {
    bookSchema
}