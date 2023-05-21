const { User, Thought } = require("../models");

module.exports = {
  //::::: GET ROUTE => /api/users
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.json({ message: "All users.", users });
    } catch (err) {
      res.status(400).json({ message: "Error getting all users." });
    }
  },

  //::::: GET ROUTE => /api/users/:id
  async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res.status(400).json({ message: "No user found with this ID." });
      }
      res.json({ message: "User found!", user });
    } catch (err) {
      res.status(400).json({ message: "Error getting user." });
    }
  },

  //::::: POST ROUTE => /api/users
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json({ message: "User successfully added !", user });
    } catch (err) {
      res.status(400).json({ message: "Error creating user." });
    }
  },

  //::::: PUT ROUTE => /api/users/:id
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );
      if (!user) {
        return res.status(400).json({ message: "No user found with this ID." });
      }
      res.json({ message: "User successfully updated.", user });
    } catch (err) {
      res.status(400).json({ message: "Error updating user." });
    }
  },

  //::::: DELETE ROUTE => /api/users/:id
  async deleteUser(req, res) {
    try {
      // Delete user
      const user = await User.findOneAndDelete({ _id: req.params.id });
      if (!user) {
        return res.status(400).json({ message: "No user found with this ID." });
      }

      // Remove friend relationship on all friends
      await User.updateMany(
        { friends: req.params.id },
        { $pull: { friends: req.params.id } },
        { new: true }
      );

      // Delete all thoughts in user thoughts array
      await Thought.deleteMany({ _id: { $in: user.thoughts } });

      res.json({ message: "User and associated thoughts deleted!", user });
    } catch (err) {
      res.status(400).json({ message: "Error deleting user." });
    }
  },

  //::::: POST ROUTE => /api/users/:userID/friends/:friendID
  async addFriend(req, res) {
    //
    try {
      // :::::::::::::: Step 1 :::::::::::::::::
      //      Add NEW FRIEND to the USER
      // :::::::::::::::::::::::::::::::::::::::
      const user = await User.findByIdAndUpdate(
        { _id: req.params.userID },
        { $push: { friends: req.params.friendID } },
        { new: true }
      );
      if (!user) {
        return res.status(400).json({ message: "No user found with this ID." });
      }

      // ::::::::::::::::::: Step 2 ::::::::::::::::::::::
      //   Find the new friend and add the USER to
      //   the NEW FRIEND as a friend as well
      // :::::::::::::::::::::::::::::::::::::::::::::::::
      const friend = await User.findByIdAndUpdate(
        { _id: req.params.friendID },
        { $push: { friends: req.params.userID } },
        { new: true }
      );

      if (!friend) {
        return res
          .status(400)
          .json({ message: "No friend found with this ID." });
      }

      res.json({ message: "Added a new friend!", user, friend });
    } catch (err) {
      res.status(400).json({ message: "Error adding friend." });
    }
  },

  //::::: DELETE ROUTE => /api/users/:userID/friends/:friendID
  async removeFriend(req, res) {
    try {
      // :::::::::::::: Step 1 :::::::::::::::::
      //          Delete USER friend
      // :::::::::::::::::::::::::::::::::::::::
      const user = await User.findByIdAndUpdate(
        { _id: req.params.userID },
        { $pull: { friends: req.params.friendID } },
        { new: true }
      );
      if (!user) {
        return res.status(400).json({ message: "No user found with this ID!" });
      }

      // ::::::::::::::::::: Step 2 ::::::::::::::::::::::
      //   Find the deleted friend and remove the USER
      //   from the friend as well
      // :::::::::::::::::::::::::::::::::::::::::::::::::
      const friend = await User.findByIdAndUpdate(
        { _id: req.params.friendID },
        { $pull: { friends: req.params.userID } },
        { new: true }
      );

      if (!friend) {
        return res.json({ message: "No friend found with this ID." });
      }

      res.json({ message: "Lost a friend.", user, friend });
    } catch (err) {
      res.status(400).json({ message: "Error removing friend." });
    }
  },
};
