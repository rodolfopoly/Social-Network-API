const { User } = require('../models');

const userController = {
  // the functions will go in here as methods
  //get all users
  async getAllUser(req, res) {
    try {
      const userData = await User.find({})
        .populate({
          path: 'thoughts',
          select: '-__v'
        })
        .populate({
          path: 'friends',
          select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 });
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  // get one user by id
  async getUserById({ params }, res) {
    try {
      const userData = await User.findOne({ _id: params.id })
        .populate({
          path: 'thoughts',
          select: '-__v'
        })
        .populate({
          path: 'friends',
          select: '-__v'
        })
        .select('-__v');
      // If no pizza is found, send 404
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id!' });
      }
      else { res.json(userData) };
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    };
  },
  //create a user
  async createUser({ body }, res) {
    try {
      const userData = await User.create(body);
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  //update a user by id
  async updateUser({ params, body }, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: params.id },
        body,
        { new: true })
        .populate({
          path: 'thoughts',
          select: '-__v'
        })
        .populate({
          path: 'friends',
          select: '-__v'
        })
        .select('-__v');
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id!' });
      }
      else { res.json(userData) };
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  //delete a user
  async deleteUser({ params }, res) {
    try {
      const userData = await User.findOneAndDelete({ _id: params.id })
      // If no pizza is found, send 404
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id!' });
      }
      else { res.json(userData) };
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    };
  },
  //add a new friend to a user's friend list
  async addFriend({ params }, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { friends: params.friendId } },
        { new: true }
      )
      if (!userData) {
        res.status(404).json({ message: 'No notebook found with this id!' });
      }
      else { res.json(userData); }
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  async deleteFriend({ params }, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true }
      )
      if (!userData) {
        res.status(404).json({ message: 'No notebook found with this id!' });
      }
      else { res.json(userData); }
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }

};

module.exports = userController;