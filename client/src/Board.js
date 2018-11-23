// Board.js
import React, { Component } from 'react';
import NoteList from './NoteList';
import NoteForm from './NoteForm';
import DATA from './data';
import './Board.css';

class Board extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      error: null,
      author: '',
      text: ''
    };
    this.pollInterval = null;
  }

  componentDidMount() {
    this.loadNotesFromServer();
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadNotesFromServer, 2000);
    }
  }

  componentWillUnmount() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  loadNotesFromServer = () => {
    fetch('/api/notes/')
      .then(data => data.json())
      .then((res) => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ data: res.data });
      });
  }

  render() {
    return (
      <div className="container">

        {/* show existing notes*/}
        <div className="notes">
          <h2>Notes:</h2>
          <NoteList data={this.state.data} />
        </div>

        {/* for posting a new note*/}
        <div className="form">
          <NoteForm author={this.state.author} text={this.state.text}/>
        </div>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}

export default Board;
