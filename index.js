require('dotenv').config();


// import express framework
const express = require("express");
const mongoose = require("mongoose");
const req = require("express/lib/request");
const res = require("express/lib/response");

//import our database
const database = require("./database/index");


//models
const bookModels = require("./database/book");
const authorModels = require("./database/author");
const publicationModels = require("./database/publication");
const bookModel = require('./database/book');



//establishing connection with mongodb
mongoose.connect(process.env.MONGO_URL).then(() => console.log("connection established"))

//initilizing
const Bloom = express();

Bloom.use(express.json());

/*
Route           /
Description     to get all books
Access          PUBLIC
Parameters      NONE
Method          GET
*/
Bloom.get("/",async (req,res) => {  
    const getAllBooks = await bookModel.find();
    return res.json({getAllBooks });//database.books     ---just using the database we created as a file
});

/*
Route           /is
Description     to get specific book
Access          PUBLIC
Parameters      isbn
Method          GET
*/
Bloom.get("/is/:isbn",async (req,res) =>{
    const getSpecificBook = await bookModel.findOne({ISBN:req.params.isbn})
    //mongoose will return null value if nothing is there
    if(!getSpecificBook){
        return res.json({error: `No book found for ISBN:${req.params.isbn}`});
    }

    return res.json({book: getSpecificBook})
 /*   const getSpecificBook =  database.books.filter(
        (book) => book.ISBN === req.params.isbn
    );

    if(getSpecificBook.length === 0){
        return res.json({error: `No book found for ISBN:${req.params.isbn}`});
    }

    return res.json({book: getSpecificBook})          --------this code using our databse created file*/ 
});


/*
Route           /c
Description     to get specific books based on category
Access          PUBLIC
Parameters      category
Method          GET
*/

Bloom.get("/c/:category",async (req,res) => {
    const getSpecificBooks = await bookModel.findOne({
        category: req.params.category
    });

    if(!getSpecificBooks){
        return res.json({error: `No book found for category of:${req.params.category}`});
    }

    return res.json({book: getSpecificBooks}) 
    /*const getSpecificBooks = database.books.filter(
        (book) => book.category.includes(req.params.category)
    );

    if(getSpecificBooks.length === 0){
        return res.json({error: `No book found for category of:${req.params.category}`});
    }

    return res.json({book: getSpecificBooks})   */ 
});





/*
Route           /a
Description     to get specific books based on author
Access          PUBLIC
Parameters      author
Method          GET
*/

Bloom.get("/a/:authors", (req,res) => {
    const getSpecificBooks = database.books.filter(
        (book) => book.authors.includes(req.params.authors)
    );
    

    if(getSpecificBooks.length === 0){
        return res.json({error: `No book found for  author:${req.params.authors}`});
    }

    return res.json({book: getSpecificBooks})    
});





/*
Route           /authors
Description     to get all authors
Access          PUBLIC
Parameters      NONE
Method          GET
*/
Bloom.get("/authors",async (req,res) => {
    const getAllAuthors = await authorModels.find();
    return res.json({getAllAuthors });

    //return res.json({authors: database.authors});
});



/*
Route           /auth
Description     to get specific author
Access          PUBLIC
Parameters      name
Method          GET
*/
Bloom.get("/auth/:name", (req,res) =>{
    const getSpecificBook = database.authors.filter(
        (book) => book.name === req.params.name
    );

    if(getSpecificBook.length === 0){
        return res.json({error: `No book found for author:${req.params.name}`});
    }

    return res.json({book: getSpecificBook})
});

/*
Route           /authors
Description     to get authors based on book's isbn
Access          PUBLIC
Parameters      isbn
Method          GET
*/
Bloom.get("/author/:isbn", (req,res) =>{
    const getSpecificAuthors = database.authors.filter(
        (author) => author.books.includes(req.params.isbn)
    );

    if(getSpecificAuthors.length === 0){
        return res.json({error: `No author found for book's isbn:${req.params.isbn}`});
    }

    return res.json({book: getSpecificAuthors})
});

/*
Route           /publications
Description     to get all publuications
Access          PUBLIC
Parameters      NONE
Method          GET
*/
Bloom.get("/publications",async(req,res) => {
    const getAllPublications = await publicationModels.find();
    return res.json({getAllPublications });
    
    //return res.json({publications: database.publications});
});


/*
Route           /pub
Description     to get specific publication
Access          PUBLIC
Parameters      name
Method          GET
*/
Bloom.get("/pub/:name", (req,res) =>{
    const getSpecificBook = database.publications.filter(
        (book) => book.name === req.params.name
    );

    if(getSpecificBook.length === 0){
        return res.json({error: `No book found for publication:${req.params.name}`});
    }

    return res.json({book: getSpecificBook})
});


/*
Route           /publications
Description     to get publication based on book's isbn
Access          PUBLIC
Parameters      isbn
Method          GET
*/
Bloom.get("/publications/:isbn", (req,res) =>{
    const getSpecificPublications = database.publications.filter(
        (pub) => pub.books.includes(req.params.isbn)
    );

    if(getSpecificPublications.length === 0){
        return res.json({error: `No pub found for book's isbn:${req.params.isbn}`});
    }

    return res.json({book: getSpecificPublications})
});





/*
Route           /book/new
Description     add new book
Access          PUBLIC
Parameters      NONE
Method          POST
*/
//using POSTMAN
Bloom.post("/book/new",async (req,res) => {
    const {newBook} = req.body;
    const addNewBook = bookModels.create(newBook);
    return res.json({ books: addNewBook, message:"book added "});
      /*const {newBook} = req.body;
      database.books.push(newBook);
      return res.json({ books: database.books, message:"book added "});  -------------using our db"*/
});


/*
Route           /author/new
Description     add new author
Access          PUBLIC
Parameters      NONE
Method          POST
*/
//using POSTMAN
Bloom.post("/author/new",async (req,res) => {
    const {newAuthor} = req.body;
    const addNewAuthor = authorModels.create(newAuthor);
    return res.json({ Authors: addNewAuthor, message:"Author added "});
   /* const {newAuthor} = req.body;
    database.authors.push(newAuthor);
    return res.json({authors: database.authors, message:"author added"})*/
});




/*
Route           /publication/new
Description     add new publication
Access          PUBLIC
Parameters      NONE
Method          POST
*/
//using POSTMAN
Bloom.post("/publication/new",async  (req,res) => {
    const {newPublication} = req.body;
    const addNewPublication = publicationModels.create(newPublication);
    return res.json({ Publications: addNewPublication, message:"Publication added "});
   /* const {newPublication} = req.body;
    database.publications.push(newPublication);
    return res.json({publications: database.publications, message:"publication added"})*/
});





/*
Route           /book/update
Description     update title of the book
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
//using POSTMAN
Bloom.put("/book/update/:isbn",async (req,res) => {
    const updatedBook = await bookModels.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },{
            title: req.body.bookTitle
        },{
            new: true
        }
    );

    return res.json({books: updatedBook});
   
   
    /* database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.title = req.body.bookTitle;
            return;
        }
    });

    return res.json({books: database.books});*/
});


/*
Route           /book/author/update
Description     update or add new author
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
//using POSTMAN
Bloom.put("/book/author/update/:isbn",async (req,res) =>{
    //update book database
    const updatedBook = await bookModels.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },{
            $addToSet:{
                authors: req.body.newAuthor
            }
        },{
            new: true
        }
    );
    /*database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            return book.authors.push(req.body.newAuthor);
        }
         
    });*/
    //update author database
    const updatedAuthor = await authorModels.findOneAndUpdate(
        {
            id: req.body.newAuthor
        },{
            $addToSet:{
                books: req.params.isbn
            }
        },{
            new: true
        }
    );
   /* database.authors.forEach((author) => {
        if(author.id === req.body.newAuthor){
            return author.books.push(req.params.isbn);
        }
    })
    return res.json({books: database.books,authors:database.authors,message: "book and authors added"})*/
    return res.json({books: updatedBook,authors:updatedAuthor,message: "book and authors added"})
});






/*
Route           /book/delete
Description     update or add new author
Access          PUBLIC
Parameters      isbn
Method          DELETE
*/

Bloom.delete("/book/delete/:isbn",async (req,res) => {
    const deleteBook =await bookModels.findOneAndDelete(
        {
            ISBN: req.params.isbn
        }
    );

  /*  const updatedBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
    );
    //here we need to change the database to let insetad of const
    database.books = updatedBookDatabase;
    return res.json({books: database.books});*/
    return res.json({books: deleteBook});
});



/*
Route           /book/delete/author
Description     delete an author
Access          PUBLIC
Parameters      isbn/author
Method          DELETE
*/
Bloom.delete("/book/delete/author/:isbn/:authorId",async(req,res) => {
    //update book database
    const updatedBook = await bookModels.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },{
            $pull:{
                authors: parseInt(req.params.authorId)
            }
        },{
            new:true
        }
    );
    /*database.books.forEach((book) =>{
        if(book.ISBN === req.params.isbn){
            const newAuthorList = book.authors.filter(
                (author)  => author !== parseInt(req.params.authorId)
            );
            book.authors = newAuthorList;
            return;
        }
    });*/


    //update author database
    const updatedAuthor = await authorModels.findOneAndUpdate(
        {
            id: parseInt(req.params.authorId)
        },{
            $pull:{
                books: req.params.isbn
            }
        },{
            new:true
        }
    );
    
   /* database.authors.forEach((author) =>{
        if(author.id === parseInt(req.params.authorId)){
            const newBooksList = author.books.filter(
                (book) => book !== req.params.isbn
            );

            author.books = newBooksList;
            return;
        }
    });*/

   // return res.json({books:database.books,authors:database.authors, message:"author deleted"});
   return res.json({books:updatedBook,authors:updatedAuthor, message:"author deleted"});
});





Bloom.listen(4140, () => console.log("Server is running"));
