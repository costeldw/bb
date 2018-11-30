// Board.js
import React, { Component } from 'react';
import NoteList from './NoteList';
import NoteForm from './NoteForm';
//import DATA from './data';
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

  onChangeText = (e) => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  onUpdateNote = (id) => {
    const oldNote = this.state.data.find(c => c._id === id);
    if (!oldNote) return;
    this.setState({
        author: oldNote.author,
        text: oldNote.text,
        updateId: id
    });
  }

  onDeleteNote = (id) => {
    const i = this.state.data.findIndex(c => c._id === id);
    const data = [
      ...this.state.data.slice(0, i),
      ...this.state.data.slice(i + 1),
    ];
    this.setState({ data });
    fetch(`api/notes/${id}`, { method: 'DELETE' })
      .then(res => res.json()).then((res) => {
        if (!res.success) this.setState({ error: res.error });
      });
  }

  submitNote = (e) => {
    e.preventDefault();
    const { author, text, updateId } = this.state;
    if (!author || !text) return;
    if (updateId){
        this.submitUpdatedNote();
    } else{
        this.submitNewNote();
    }
  }

  submitNewNote = () => {
    const { author, text } = this.state;
    const data = [
      ...this.state.data,
      {
        author,
          text,
          _id: Date.now().toString(),
          updatedAt: new Date(),
          createdAt: new Date()
      },
    ];
    this.setState({ data });
    fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, text }),
    }).then(res => res.json()).then((res) => {
      if (!res.success) this.setState({ error: res.error.message || res.error });
      else this.setState({ author: '', text: '', error: null });
    });
  }

  submitUpdatedNote = () => {
    const { author, text, updateId } = this.state;
    fetch(`/api/notes/${updateId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, text }),
    }).then(res => res.json()).then((res) => {
      if (!res.success) this.setState({ error: res.error.message || res.error });
      else this.setState({ author: '', text: '', updateId: null });
    });
  }

  render() {
    return (
      <div className="container">

        {/* show existing notes*/}
        <div className="notes">
          <h2>Notes:</h2>
          <NoteList 
            data={this.state.data}
            handleDeleteNote={this.onDeleteNote}
            handleUpdateNote={this.onUpdateNote}
          />
        </div>

        {/* for posting a new note*/}
        <div className="form">
          <NoteForm 
            author={this.state.author} 
            text={this.state.text}
            handleChangeText={this.onChangeText}
            submitNote={this.submitNote}
          />
        </div>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}

export default Board;
