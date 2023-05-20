const { Thought } = require("../models");

module.exports = {
  //::::: POST ROUTE => /api/thoughts/:thoughtID/reactions
  async createReaction(req, res) {
    try {
      // Create reaction
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtID },
        { $push: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!reaction) {
        return res
          .status(400)
          .json({ message: "No reaction found with this ID." });
      }

      res.json({ message: "Reaction created successfully.", reaction });
    } catch (err) {
      res.status(400).json({ message: "Error creating reaction.", err });
    }
  },

  //::::: POST ROUTE => /api/thoughts/:thoughtId/reactions/:reactionId
  async deleteReaction(req, res) {
    try {
      // Delete reaction
      //   const reaction = await Reaction.findByIdAndDelete(req.params.reactionID);

      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtID },
        { $pull: { reactions: { _id: req.params.reactionID } } },
        { new: true }
      );
      if (!thought) {
        return res
          .status(400)
          .json({ message: "No reaction found with this ID." });
      }
      res.json({ message: "Reaction deleted successfully." });
    } catch (err) {
      res.status(400).json({ message: "Error deleting reaction.", err });
    }
  },
};
