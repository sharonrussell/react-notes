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
			crossDomain: true,
		});

		const notes = [...this.state.notes];
		const noteIndex = notes.indexOf(note);
		notes.splice(noteIndex, 1);
		this.setState({ notes });
	}
}

class Note extends React.Component {
	_handleDelete(event){
		console.log(this.props)
		event.preventDefault();
		this.props.onDelete(this.props);
	}

	render() {
		return(
			<div className="note">
				<p className="body">{this.props.body}</p>
				<p className="id">{this.props.id}</p>
				<div>
					<a href="#" onClick={this._handleDelete.bind(this)}>
						Delete
					</a>
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<Notes />, document.getElementById('notes')
);
