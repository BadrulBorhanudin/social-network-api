const { User, Thought } = require('../models');

const UserController = {
  // 1. Get all users
  getAllUsers(req, res) {
    User.find({})
      .populate('thoughts') // Populate the thoughts associated with each user
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  // 2. Get one user by ID
  getUserById(req, res) {
    User.findById(req.params.userId)
      .populate('thoughts') // Populate the thoughts associated with the user
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  // 3. Create a user
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  // 4. Update user by ID
  updateUserById(req, res) {
    User.findOneAndUpdate(req.params.id, req.body, { new: true })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // 5. Delete user
  deleteUserById(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found' });
        }
        // Chain another then block for Thought deletion
        return Thought.deleteMany({ _id: { $in: userData.thoughts } });
      })
      .then(() =>
        res.status(200).json({
          message: 'User and associated thoughts deleted successfully',
        })
      )
      .catch((err) => {
        if (!res.headersSent) {
          res.status(500).json(err);
        }
      });
  },

  // 6. Add friend to user's friend list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body.friendId || req.params.friendId } },
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // 7. Remove friend from user's friend list
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        // Check if friend was removed
        const removed = !dbUserData.friends.includes(params.friendId);
        // Return response with appropriate message
        if (removed) {
          return res.json({
            message: 'Friend removed successfully!',
            dbUserData,
          });
        }
        // If friend was not removed, return the updated user data
        return res.status(200).json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

// Export UserController
module.exports = UserController;
