class Notes extends React.Component {

	constructor(){
		super();
		this.state = {
			notes: [
				{title: "Note 1", body: "body 1", id: 1}
			]
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
