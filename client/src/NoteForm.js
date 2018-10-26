// NoteForm.js
import React from 'react';
import PropTypes from 'prop-types';

const NoteForm = props => (
  <form onSubmit={props.submitNote}>
    <input
      type="text"
      name="author"
      placeholder="Your name…"
      value={props.author}
      onChange={props.handleChangeText}
    />
    <input
      type="text"
      name="text"
      placeholder="Say something..."
      value={props.text}
      onChange={props.handleTextChange}
    />
    <button type="submit">Submit</button>
  </form>
);

NoteForm.propTypes = {
  submitNote: PropTypes.func.isRequired,
  handleChangeText: PropTypes.func.isRequired,
  text: PropTypes.string,
  author: PropTypes.string,
};

NoteForm.defaultProps = {
  text: '',
  author: '',
};

export default NoteForm;