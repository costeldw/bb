// Note.js
import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';

const Note = props => (
  <div className="singleNote">
    <img alt="user_image" className="userImage" src={`https://picsum.photos/70?random=${props.id}`} />
    <div className="textContent">
      <div className="singleNoteContent">
        <h3>{props.author}</h3>
        <ReactMarkdown source={props.children} />
      </div>
      <div className="singleNoteButtons">
        <span className="time">{moment(props.timestamp).fromNow()}</span>
        <a onClick={() => { props.handleUpdateNote(props.id); }}>update</a>
        <a onClick={() => { props.handleDeleteNote(props.id); }}>delete</a>
      </div>
    </div>
  </div>
);

Note.propTypes = {
  author: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleUpdateNote: PropTypes.func.isRequired,
  handleDeleteNote: PropTypes.func.isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default Note;