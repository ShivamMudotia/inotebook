const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTE 1 - Fetch All notes of a user using GET - "/api/notes/fetchallnotes". Auth Token needed (Login Needed)

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2 - Add a new note for a user using POST - "/api/notes/addnote". Auth Token needed (Login Needed)

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a Valid Title with atleast 3 characters ").isLength({
      min: 3,
    }),
    body(
      "description",
      "Enter a valid Description with at least 5 characters"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      // If there are validation errors, return bad request and the error(s)
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, tag } = req.body;

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3 - Update existing note for a user by note id using PUT - "/api/notes/updatenote/<id>". Auth Token needed (Login Needed)

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    //create a new note object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // find a note that needs to be updated and update it.

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("You are not authorized to update this note");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4 - Delete existing note for a user by note id using DELETE - "/api/notes/deletenote/<id>". Auth Token needed (Login Needed)

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // find a note that needs to be deleted and delete it.

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("You are not authorized to delete this note");
    }

    note = await Note.findByIdAndDelete(req.params.id);

    res.json({ Success: "Note deleted !" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
