const { Book } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    thisUser: async (parent, args) => {
      return await Book.find({}).populate('savedBooks');
    },
  },

  Mutation: {
    register: async (parent, { username, email, password }) => {
      const user = await User.findOne({
        //find by either username or email for flexibility
        $or: [{ username: username }, { email: email }],
      });

      if (!user) {
        throw new AuthenticationError(
          'Cannot find this user'
        );
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Wrong password!');
      }

      return { signToken(user), user };
    },
  }

  addSavedBook: async (parent, { bookInfo }) => {
    const savedToUser = await User.findOneAndUpdate(
      { _id: user._id },
      {
        $addToSet: { savedBooks: bookInfo },
      },
      { new: true, runValidators: true }
    );
    return savedToUser;
  },

};

module.exports = resolvers;
