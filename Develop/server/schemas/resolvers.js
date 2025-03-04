const books = [];
const resolvers = {
    Query: {
        me: async (parent, args, context) => {
          if (context.user) {
            return User.findOne({ _id: context.user._id }).populate('savedBooks');
          }
          throw new AuthenticationError('You need to be logged in!');
        },
        books: async () => {
          return Book.find();
        }
      },
      Mutation: {
        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });
          if (!user) {
            throw new AuthenticationError('No user found with this email address');
          }
          const correctPw = await user.isCorrectPassword(password);
          if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
          }
          const token = signToken(user);
          return { token, user };
        },
        addUser: async (parent, { username, email, password }) => {
          const user = await User.create({ username, email, password });
          const token = signToken(user);
          return { token, user };
        },
        saveBook: async (parent, { bookData }, context) => {
          if (context.user) {
            const updatedUser = await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $addToSet: { savedBooks: bookData } },
              { new: true }
            ).populate('savedBooks');
            return updatedUser;
          }
          throw new AuthenticationError('You need to be logged in!');
        },
        removeBook: async (parent, { bookId }, context) => {
          if (context.user) {
            const updatedUser = await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $pull: { savedBooks: { bookId: bookId } } },
              { new: true }
            ).populate('savedBooks');
            return updatedUser;
          }
          throw new AuthenticationError('You need to be logged in!');
        }
      }
  };
  
  module.exports = resolvers;