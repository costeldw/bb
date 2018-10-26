// NoteList.js
import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note';

const NoteList = (props) => {
  const noteNodes = props.data.map(note => (
    <Note author={note.author} key={note._id} id={note._id}>
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
  })),
};

NoteList.defaultProps = {
  data: [],
};

export default NoteList;