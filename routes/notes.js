const express = require('express')
const router = express.Router()
const Notes = require('../models/Notes')

//create one
router.post('/', async (req, res) => {
  const note = new Notes({
    title: req.body.title,
    description: req.body.description
  })
  try {
    const newNote = await note.save()

    if (!newNote) {
      res.status(400).json({ status: false, message: 'not created' })
    }

    res.status(201).json({ status: true, result: newNote })
  } catch(e) {
    res.status(500).json({ status: false, message: e.message })
  }
})

//get all
router.get('/', async (req, res) => {
  try {
    const notes = await Notes.find()

    if (!notes) {
      return res.status(400).json({ status: false, message: 'no data found' })
    }

    res.status(200).json({ status: true, results: notes })
  } catch (e) {
    res.status(500).json({ status: false, message: e.message })
  }
})

//get one
router.get('/:id', getNote, (req, res) => {
  res.send(res)
})

// update one
router.patch('/:id', getNote, async (req, res) => {
  if (req.body.title != null) {
    res.note.title = req.body.title
  }
  if (req.body.description != null) {
    res.note.description = req.body.description
  }

  try {
    const updatedNote = await res.note.save()
    res.status(200).json({ status: false, result: updatedNote })
  } catch (e) {
    res.status(400).json({ status: false, message: e.message })
  }
})

//delete one
router.delete('/:id', getNote, async(req, res) => {
  try {
    await res.note.remove()
    res.status(200).json({ status: true, message: 'Successfully Deleted'})
  } catch (e) {
    res.status(500).json({ status: false, message: e.message })
  }
})

async function getNote(req, res, next) {
  let note
  try {
    note = await Notes.findById(req.params.id)

    if (note == null) {
      return res.status(404).json({ status: false, message: 'Cannot find note' })
    }
  } catch (e) {
    res.status(500).json({ status: false, message: e.message })
  }
  res.note = note
  next()
}

module.exports = router