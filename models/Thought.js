const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction')

const ThoughtSchema = new Schema({

  thoughtText: {
    type: String,
    require: 'Thought Text is Required',
    validate: [({ length }) => length >= 1 && length <= 280, 'Must be between 1 and 280 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => {
      if (createdAtVal) return createdAtVal.toISOString().split("T") [0];
    },
  },
  username: {
    type: String,
    required: 'Username is required'
  },
  reactions: [ReactionSchema]
},
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;