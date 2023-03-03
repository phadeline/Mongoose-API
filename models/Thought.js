const { Schema, model } = require("mongoose");

const reactionSchema = require("./Reaction");

function dateFunction(value) {
  return value.toLocaleDateString();
}

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: [true, "your Thought must be a least 1 letter"],
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => dateFunction(date),
    },
    username: [
      {
        type: String,
        required: true,
      },
    ],
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
