class Notes extends React.Component {

	constructor(){
		super();
		this.state = {
			notes: []
		}
	}
	
	render() {
		const notes = this._getNotes();
		return (
			<div className="notes">
				<h1>Notes</h1>
				<NoteForm addNote={this._addNote.bind(this)}/>
				<div>
					{notes}
				</div>
			</div>
		);
	};

	componentWillMount() {
		this._fetchNotes();
	};

	componentDidMount() {
		this._timer = setInterval(
			() => this._fetchNotes(),
			5000
		);
	};

	componentWillUnmount() {
		clearInterval(this._timer);
	};

	_fetchNotes() {
		jQuery.ajax({
			method: 'GET',
			url: 'http://localhost:3000/notes',
			success: (notes) => {
				this.setState({ notes })
			}
		});	
	};

	_getNotes() {
		return this.state.notes.map((note) => {
	 		return (
	 			<Note
	 			body={note.body}
				key={note._id}
				id={note._id}
				onDelete={this._deleteNote.bind(this)}/>
	 		);
	 	});
	};

	_deleteNote(note){
		jQuery.ajax({
			method: 'POST',
			url: `http://localhost:3000/delete/${note.id}`,
			crossDomain: true
		});
	}

	_addNote(body){
		jQuery.ajax({
			method: 'POST',
			url: `http://localhost:3000/add`,
			data: {"body": body},
			crossDomain: true
		});
	}
}

class Note extends React.Component {
	_handleDelete(event){
		event.preventDefault();
		this.props.onDelete(this.props);
	}

	render() {
		return(
			<div className="note">
				<p className="body">{this.props.body}</p>
				<div>
					<a href="#" onClick={this._handleDelete.bind(this)}>
						Delete
					</a>
				</div>
			</div>
		);
	}
}

class NoteForm extends React.Component {
	_handleSubmit(event){
		event.preventDefault();
 		let body = this._body;
 		this.props.addNote(body.value);
	}

	render(){
		return(
			<form className="note-form" onSubmit={this._handleSubmit.bind(this)}>
				<textarea placeholder="Body:" ref={(textarea) => this._body = textarea}>
				</textarea>
				<div className="note-form-actions">
 					<button type="submit">
 						Add note
 					</button>
 				</div>
			</form>
		);
	}
}

ReactDOM.render(
	<Notes />, document.getElementById('notes')
);
