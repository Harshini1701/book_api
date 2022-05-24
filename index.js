// import express framework
const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");

//import our database
const database = require("./database/index");

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
Bloom.get("/",(req,res) => {
    return res.json({books: database.books});
});

/*
Route           /is
Description     to get specific book
Access          PUBLIC
Parameters      isbn
Method          GET
*/
Bloom.get("/is/:isbn", (req,res) =>{
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
    );

    if(getSpecificBook.length === 0){
        return res.json({error: `No book found for ISBN:${req.params.isbn}`});
    }

    return res.json({book: getSpecificBook})
});


/*
Route           /c
Description     to get specific books based on category
Access          PUBLIC
Parameters      category
Method          GET
*/

Bloom.get("/c/:category", (req,res) => {
    const getSpecificBooks = database.books.filter(
        (book) => book.category.includes(req.params.category)
    );

    if(getSpecificBooks.length === 0){
        return res.json({error: `No book found for category of:${req.params.category}`});
    }

    return res.json({book: getSpecificBooks})    
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
Bloom.get("/authors",(req,res) => {
    return res.json({authors: database.authors});
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
Bloom.get("/publications",(req,res) => {
    return res.json({publications: database.publications});
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
Bloom.post("/book/new", (req,res) => {
      const {newBook} = req.body;
      database.books.push(newBook);
      return res.json({ books: database.books, message:"book added "});
});


/*
Route           /author/new
Description     add new author
Access          PUBLIC
Parameters      NONE
Method          POST
*/
//using POSTMAN
Bloom.post("/author/new", (req,res) => {
    const {newAuthor} = req.body;
    database.authors.push(newAuthor);
    return res.json({authors: database.authors, message:"author added"})
});




/*
Route           /publication/new
Description     add new publication
Access          PUBLIC
Parameters      NONE
Method          POST
*/
//using POSTMAN
Bloom.post("/publication/new", (req,res) => {
    const {newPublication} = req.body;
    database.publications.push(newPublication);
    return res.json({publications: database.publications, message:"publication added"})
});





/*
Route           /book/update
Description     update title of the book
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
//using POSTMAN
Bloom.put("/book/update/:isbn", (req,res) => {
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.title = req.body.bookTitle;
            return;
        }
    });

    return res.json({books: database.books});
});


/*
Route           /book/author/update
Description     update or add new author
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
//using POSTMAN
Bloom.put("/book/author/update/:isbn", (req,res) =>{
    //update book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            return book.authors.push(req.body.newAuthor);
        }
         
    });
    //update author database
    database.authors.forEach((author) => {
        if(author.id === req.body.newAuthor){
            return author.books.push(req.params.isbn);
        }
    })
    return res.json({books: database.books,authors:database.authors,message: "book and authors added"})
});






/*
Route           /book/delete
Description     update or add new author
Access          PUBLIC
Parameters      isbn
Method          DELETE
*/

Bloom.delete("/book/delete/:isbn",(req,res) => {
    const updatedBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
    );
    //here we need to change the database to let insetad of const
    database.books = updatedBookDatabase;
    return res.json({books: database.books});
});



/*
Route           /book/delete/author
Description     delete an author
Access          PUBLIC
Parameters      isbn/author
Method          DELETE
*/
Bloom.delete("/book/delete/author/:isbn/:authorId",(req,res) => {
    //update book database
    database.books.forEach((book) =>{
        if(book.ISBN === req.params.isbn){
            const newAuthorList = book.authors.filter(
                (author)  => author !== parseInt(req.params.authorId)
            );
            book.authors = newAuthorList;
            return;
        }
    });


    //update author database
    database.authors.forEach((author) =>{
        if(author.id === parseInt(req.params.authorId)){
            const newBooksList = author.books.filter(
                (book) => book !== req.params.isbn
            );

            author.books = newBooksList;
            return;
        }
    });

    return res.json({books:database.books,authors:database.authors, message:"author deleted"});
});





Bloom.listen(4140, () => console.log("Server is running"));
