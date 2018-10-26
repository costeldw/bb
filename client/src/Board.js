// Board.js
import React, { Component } from 'react';
import NoteList from './NoteList';
import NoteForm from './NoteForm';
import DATA from './data';
import './Board.css';

class Board extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }
  render() {
    return (
      <div className="container">

        {/* show existing notes*/}
        <div className="notes">
          <h2>Notes:</h2>
          <NoteList data={DATA} />
        </div>

        {/* for posting a new note*/}
        <div className="form">
          <NoteForm />
        </div>
      </div>
    );
  }
}

export default Board;
