const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import subdocument schema from Book.js
const bookSchema = require('./Book');

const userSchema = new Schema(
  {
    //both username and email are unique and required
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      //regular expression to check for valid email string user provides
      match: [/.+@.+\..+/, 'Valid email address needed'], 
    },
    //no constraints on password
    password: {
      type: String,
      required: true,
    },
    // Array of books matching bookSchema
    savedBooks: [bookSchema],
  },
  // allow virtuals
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// return count of saved books when querying this model
userSchema.virtual('bookCount').get(function () {
  return this.savedBooks.length;
});

//use bcrypt to hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});


//compare password during login
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//instantiate and export User model 
const User = model('User', userSchema);
module.exports = User;
