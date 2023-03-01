const { Schema, model } = require("mongoose");
// var uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a unique username"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter a unique email"],
      unique: true,
      match: /.+\@.+\..+/,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// userSchema.plugin(uniqueValidator);

userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });
  
  const User = model('user', userSchema);
  
  module.exports = User;
