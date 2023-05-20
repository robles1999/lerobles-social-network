const router = require("express").Router();

// ::::::::::::::::::::::::::::::::::::::::
//      IMPORT ALL THOUGHT CONTROLLERS
// ::::::::::::::::::::::::::::::::::::::::
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThoughtById,
  deleteThoughtById,
} = require("../../controllers/thoughtController");

//::::::::::::::::::::::::::::::::::::::::
//      IMPORT ALL REACTION CONTROLLERS
//::::::::::::::::::::::::::::::::::::::::
// const {
//   createReaction,
//   deleteReaction,
// } = require("../../controllers/reactionController");

// GET to get all thoughts
router.get("/", getAllThoughts);

// GET to get a single thought by its _id
router.get("/:id", getThoughtById);

// POST to create a new thought
router.post("/", createThought);

// PUT to update a thought by its _id
// router.put("/:id", updateThoughtById);

// DELETE to remove a thought by its _id
// router.delete("/:id", deleteThoughtById);

// POST to create a reaction stored in a single thought's
// reactions array field;
// router.post("/:thoughtId/reactions", createReaction);

// DELETE to pull and remove a reaction by the reaction's reactionId value
// router.delete("/:thoughtId/reactions/:reactionId", deleteReaction);

module.exports = router;
