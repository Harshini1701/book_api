const mongoose = require("mongoose");

//creating book schema
const bookSchema = mongoose.Schema({
    ISBN: String,
    title: String,
    authors: [Number],
    language: String,
    pubDate: String,
    numOfPage: Number,
    category: [String],
    publication:Number
});


//craete a book model
const bookModel = mongoose.model(bookSchema);


module.exports = bookModel;