const uuidv4 = require("uuid/v4");
const notes = require('express').Router();
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

//get object from db.json file
notes.get('/',(req,res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});
//append new note to db file (append with id)
notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text, id } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully`);
    } else {
      res.error('Error in adding note');
    }
  });

//delete object based on id
notes.delete('/:id',(req,res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id !== noteId);
      writeToFile('./db/db.json', result);
      res.json(`Item ${noteId} has been deleted`);
    });
});

module.exports = notes;