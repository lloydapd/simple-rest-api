require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

const notesRouter = require('./routes/notes')
app.use('/notes', notesRouter)

app.listen(3000, () => console.log("Server Started"))
