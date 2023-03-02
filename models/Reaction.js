const { Schema, model } = require("mongoose");

function dateFunction (value){
 return value.toLocaleDateString();
}

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },

    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
      ref: 'user'
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: date => dateFunction(date)
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false,
  }
);

module.exports = reactionSchema;
