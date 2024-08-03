const books = [];
const resolvers = {
    Query: {
      books: () => books,
    },
    Mutation: {
      addBook: (_, { title, author, description, image, link }) => {
        const book = { id: books.length + 1, title, author, description, image, link };
        books.push(book);
        return book;
      },
      removeBook: (_, { id }) => {
        const index = books.findIndex(book => book.id === parseInt(id));
        if (index !== -1) {
          return books.splice(index, 1)[0];
        }
        return null;
      },
    },
  };
  
  module.exports = resolvers;