const { User, Thought } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })

      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "no thought found with that Id" })
          : res.status(200).json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { thougths: thought._id } },
          { runValidators: true, new: true }
        ).then((thought) =>
          !thought
            ? res
                .status(400)
                .json({ message: "Could not find username to update User" })
            : res.status(200).json({ message: "thought created" })
        );
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((updatedThought) =>
        !updatedThought
          ? res.status(400).json({ message: "no Thought found with that Id!" })
          : res.status(200).json(updatedThought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteThought(req, res) {
    Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        ).then((thought) =>
          !thought
            ? res
                .status(400)
                .json({ message: "Thought created but no user was found" })
            : res
                .status(200)
                .json({ message: "thought deleted and updated in user" })
        );
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  createReaction(req, res) {
    Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId,
      },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res.status(400).json({ message: "no thought found with this id!" })
          : res.status(200).json(reaction)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId,
      },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(500).json({ message: "No thought found with this id!" })
          : res.status(200).json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
//reaction needs a reactionBody and a Username
