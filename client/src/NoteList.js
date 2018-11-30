// NoteList.js
import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note';

const NoteList = (props) => {
  const noteNodes = props.data.map(note => (
    <Note 
        author={note.author}
        key={note._id}
        id={note._id}
        timestamp={note.updatedAt}
        handleUpdateNote={props.handleUpdateNote}
        handleDeleteNote={props.handleDeleteNote}
    >
        { note.text}
    </Note>
  ));
  return (
    <div>
      { noteNodes }
    </div>
  );
};

NoteList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string,
    id: PropTypes.string,
    text: PropTypes.string,
    updatedAt: PropTypes.string,
  })),
  handleDeleteNote: PropTypes.func.isRequired,
  handleUpdateNote: PropTypes.func.isRequired,
};

NoteList.defaultProps = {
  data: [],
};

export default NoteList;