// server.js
import { getSecret } from './secrets';
import Note from './models/note';

import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

const app = express();
const router = express.Router();


const API_PORT = process.env.API_PORT || 3001;

require('dotenv').config();

// db config
mongoose.connect(getSecret('dbUri'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// now we can set the route path & initialize the API
router.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});


router.get('/notes', (req, res) => {
  Note.find((err, notes) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: notes });
  });
});

router.post('/notes', (req, res) => {
  const note = new Note();
  // body parser lets us use the req.body
  const { author, text } = req.body;
  if (!author || !text) {
    // we should throw an error. we can do this check on the front end
    return res.json({
      success: false,
      error: 'You must provide an author and note'
    });
  }
  note.author = author;
  note.text = text;
  note.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.put('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  if (!noteId) {
    return res.json({ success: false, error: 'No note id provided' });
  }
  Note.findById(noteId, (error, note) => {
    if (error) return res.json({ success: false, error });
    const { author, text } = req.body;
    if (author) note.author = author;
    if (text) note.text = text;
    note.save(error => {
      if (error) return res.json({ success: false, error });
      return res.json({ success: true });
    });
  });
});

router.delete('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  if (!noteId) {
    return res.json({ success: false, error: 'No note id provided' });
  }
  Note.remove({ _id: noteId }, (error, note) => {
    if (error) return res.json({ success: false, error });
    return res.json({ success: true });
  });
});

// Use our router configuration when we call /api
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));