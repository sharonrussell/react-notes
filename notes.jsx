class Notes extends React.Component {

	constructor(){
		super();
		this.state = {
			notes: []
		}
	}

	_getNotes() {
		return this.state.notes.map((note) => {
	 		return (
	 			<Note
	 			title={note.title}
	 			body={note.body}
	 			key={note.id} />
	 		);
	 	});
	};

	_addNote(title, body){
		const note ={
			id: this.state.notes.length + 1,
			title,
			body
		};
		this.setState({notes: this.state.notes.concat([note])});
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
}

class Note extends React.Component {
	render() {
		return(
			<div className="note">
				<h2 className="title">{this.props.title}</h2>
				<p className="body">{this.props.body}</p>
			</div>
		);
	}
}

class NoteForm extends React.Component {
	_handleSubmit(event){
		event.preventDefault();
		let title = this._title;
 		let body = this._body;
 		this.props.addNote(title.value, body.value);
	}

	render(){
		return(
			<form className="note-form" onSubmit={this._handleSubmit.bind(this)}>
				<input placeholder="Title:" ref={(input) => this._title = input}/>
				<textarea placeholder="Body:" ref={(textarea) => this._body = textarea}>
				</textarea>
				<div className="comment-form-actions">
 					<button type="submit">
 						Post comment
 					</button>
 				</div>
			</form>
		);
	}
}

ReactDOM.render(
	<Notes />, document.getElementById('notes')
);
