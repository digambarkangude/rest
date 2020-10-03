let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BookSchema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        isbn: { type: String, required: true },
        releaseDate: { type: Date, default: Date.now }
    }
);

module.exports = mongoose.model('book', BookSchema);