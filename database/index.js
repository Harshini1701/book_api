let books =[ //before we kept const for all apis just for delete we are using let since we are accessing whole and changing
    {
        ISBN: "ONE",
        title: "Getting Started with MERN",
        authors: [1,2],
        language: "en",
        pubDate: "29-05-01",
        numOfPage: 225,
        category: ["fiction","programming","tech"],
        publication:1
    },
    {
        ISBN: "TWO",
        title: "Getting Started with python",
        authors: [1,2,3],
        language: "en",
        pubDate: "29-05-01",
        numOfPage: 225,
        category: ["fiction","tech"],
        publication:1
    }
];

let authors =[
    {
        id: 1,
        name: "Harsha",
        books: ["ONE","TWO"],
    },
    {
        id: 2,
        name: "Harshini",
        books: ["ONE"]
    },
];

let publications =[
    {
        id:1,
        name: "AST",
        books:["ONE","TWO"]
    },
    {
        id:2,
        name: "ASH",
        books:["ONE"]
    }
];


//to export

module.exports ={books, authors, publications}