import React from 'react';

export default class Item extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{this.props.name}
				<button class='btn btn-warning' onClick={() => this.props.onDocEdit(this.props._id)}> Edit </button>
				<button class='btn btn-danger' onClick={() => this.props.onDocRemove(this.props._id)}> Remove </button>
			</div>
			);
	}
	
}