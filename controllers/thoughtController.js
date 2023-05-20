const { User, Thought } = require("../models");

module.exports = {
  //::::: GET ROUTE => /api/thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(400).json({ message: "Error getting all thoughts!!!", err });
    }
  },
  //::::: GET ROUTE => /api/thoughts/:id
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.id });
      if (!thought) {
        return res
          .status(400)
          .json({ message: "No thought found with this ID."});
      }
      res.json(thought);
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error getting thought."});
    }
  },
  //::::: POST ROUTE => /api/thoughts
  async createThought(req, res) {
    try {
      // create a thought
      const thought = await Thought.create(req.body);

      // find the user and push the thought to the
      // thoughts array
      await User.findOneAndUpdate(
        { _id: req.body.userID },
        { $push: { thoughts: thought._id } }
      );
      res.json(thought);
    } catch (err) {
      res.status(400).json({ message: "Error creating thought."});
    }
  },
};
