const { Book } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    thisUser: async (parent, args, context) => {
      if (context.user != undefined) {
        return User.findOne({ _id: context.user._id }).populate('savedBooks');
      }
    }
  },

  Mutation: {
    register: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { username, email, password }) => {
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

      const token = signToken(user);

      return { token, user };
    },

  addSavedBook: async (parent, { bookInfo }, context) => {
    if (context.user != undefined) {
      const savedToUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $push: { savedBooks: bookInfo } },
        { new: true }
      );
      return savedToUser;
    }
    throw new AuthenticationError('Must login to save book.');
  },

};

module.exports = resolvers;
