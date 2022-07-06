const { Thought, User } = require('../models');

const commentController = {

    //get all thought
    async getAllThought(req, res) {
        try {
            const thoughtData = await Thought.find({})
                .select('-__v')
                .sort({ _id: -1 });
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    // get one thought by id
    async getThoughtById({ params }, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: params.id })
                .select('-__v');
            // If no thought is found, send 404
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
            }
            else { res.json(thoughtData) };
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        };
    },

    //create a new thought
    async createThought({ body, params }, res) {
        try {
            console.log(body);
            const thoughtData = await Thought.create(body);

            const userData = await User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: thoughtData } },
                { new: true })
                .select('-__v');
            if (!userData) {
                res.status(404).json({ message: 'No thought found with this id!' });
            }
            else { res.json(userData); }
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    //update a thought
    async updateThought({ params, body }, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: params.id },
                body,
                { new: true })
                .select('-__v');
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
            }
            else { res.json(thoughtData) };
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    //delete a thought
    async deleteThought({ params }, res) {
        try {
            const thoughtData = await Thought.findOneAndDelete({ _id: params.thoughtId });

            const userData = await User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true })
                .select('-__v');
            if (!userData) {
                res.status(404).json({ message: 'No thought found with this id!' });
            }
            else { res.json(userData); }
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    //create a reaction stored in a single thought's `reactions` array field
    async createReaction({ params, body }, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { reactions: body } },
                { new: true })
                .select('-__v');
            if (!thoughtData) {
                res.status(404).json({ message: 'No reaction found with this id!' });
            }
            else { res.json(thoughtData) };
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    //remove a reaction by the reaction's `reactionId` value
    async deleteReaction({ params }, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reactions: {reactionId: params.reactionId }} },
                { new: true })
                .select('-__v');
            if (!thoughtData) {
                res.status(404).json({ message: 'No reaction found with this id!' });
            }
            else { res.json(thoughtData) };
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
};

module.exports = commentController;