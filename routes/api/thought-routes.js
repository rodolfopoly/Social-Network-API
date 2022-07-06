const router = require('express').Router();
const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controllers');

// Set up GET all at /api/thoughts
router
    .route('/')
    .get(getAllThought);

//Set up  POST at /api/thoughts/users/:userId
router
    .route('/users/:userId')
    .post(createThought);

//Set up  Delete at /api/thoughts/:thoughtId/users/:userId
router
    .route('/:thoughtId/users/:userId')
    .delete(deleteThought);

// Set up GET one and PUT at /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought);

//Set up Post reaction at /api/thought/:thoughtsId
router
    .route('/:thoughtId')
    .post(createReaction);

//Set up Delete reaction at /api/thought/:thoughtId/reaction/:reactionId
router
    .route('/:thoughtId/reaction/:reactionId')
    .delete(deleteReaction);


module.exports = router;