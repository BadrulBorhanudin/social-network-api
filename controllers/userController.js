const { User } = require('../models');

const userController = {
 getAllUsers(req, res) {
  User,find({})
  .then(userData => res.json(userData))
  .catch(err => res.status(500).json(err));
 },

 getUserById(req, res) {
  User.findById(req.params.userId)
  .then(userData => res.json(userData))
  .catch(err => res.status(500).json(err));
 },

 createUser(req, res) {
  User.create(req.body)
  .then(userData => res.json(userData))
  .catch(err => res.status(500).json(err));
 },

 updateUserById(req, res) {
  User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
  .then(userData => {
   if (!userData) {
    return res.status(404).json({ message: 'No user found with this id!' });
   }
   res.json(userData);
  })
  .catch(err => res.status(500).json(err));
 },

 deleteUserByID(req, res) {
  User.findOneAndDelete(req.params.id)
  .then(userData => {
   if (!userData) {
    return res.status(404).json({ message: 'No user found with this id!' });
   }
   res.json({ message: 'User deleted!' });
  })
  .catch(err => res.status(500).json(err));
 },

 addFriend(req, res) {
  User.findOneAndUpdate(
   { _id: req.params.userId },
   { $addToSet: { friends: req.params.friendId || req.params.friendId } },
   { new: true }
  )
  .then(userData => {
   if (!userData) {
    return res.status(404).json({ message: 'No user found with this id!' });
   }
   res.json(userData);
  })
  .catch(err => res.status(500).json(err));
 },

 removeFriend( {param}, res) {
  User.findOneAndUpdate(
   { _id: req.params.userId },
   { $pull: { friends: req.params.friendId } },
   { new: true }
  )
  .then((dbUserData) => {
   if (!dbUserData) {
    return res.status(404).json({ message: 'No user found with this id!' });
   }
   const removed = !dbUserData.friends.includes(params.friendId);
   if (removed) {
    res.json({ message: 'Friend removed!', dbUserData });
   } else {
    res.json({ message: 'Friend not removed!', dbUserData });
   }
  })
  .catch(err => res.status(400).json(err));
 },
};

module.exports = userController;