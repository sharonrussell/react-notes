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

	_addNote(event){
		event.preventDefault();
		const note = {
			title:"Dummy title",
			body:"Dummy body",
			id: this.state.notes.length + 1
		}
		this.setState({ notes: this.state.notes.concat([note]) });
	}

	render() {

		const notes = this._getNotes();
		return (
			<div className="notes">
				<h1>Notes</h1>
				<a href='#' className="note-add" onClick={this._addNote.bind(this)}>Add Note</a>
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


ReactDOM.render(
	<Notes />, document.getElementById('notes')
);
