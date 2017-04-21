import React from 'react';

import Item from './Item';

export default class Content extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	docs: [],
		  	doc: {
		  		_id: '',
		  		name: ''
		  	},
		  	pagination: {},
		  	message: ''
		};

		this.handleChangeId = this.handleChangeId.bind(this);
		this.handleChangeName = this.handleChangeName.bind(this);
	}

	find(id) {
		console.log('http://localhost:3000/docs/find/' + id);
		fetch('http://localhost:3000/docs/find/' + id)
  		.then((response) => response.json())
  		.then((responseJson) => {
  			this.setState({ 
			  	doc: {_id: responseJson[0]._id, name: responseJson[0].name},
			  	message: ''
	    	});
  		})
  		.catch( (error) => { 
  			this.message = error;
  			console.error(error);
  		});
	}

	remove(id) {
		console.log('Item.remove = ' + id);
		fetch('http://localhost:3000/docs/remove', {
  			method: 'DELETE',
  			headers: {
  				'Accept': 'application/json',
  				'Content-Type': 'application/json'
  			},
  			body: JSON.stringify({ _id: id })
  		})
  		.then((response) => response.json())
  		.then((responseJson) => { 
  			this.message = 'Document removed!';
  		})
  		.catch( (error) => { 
  			this.message = error;
  			console.error(error); 
  		});
	}

	addOrUpdate() {
		console.log('Content.addOrUpdate');

		if( this.state.doc._id !== undefined && this.state.doc._id != '' ) {
  			this.update();
  		}
  		else {
  			this.addDoc();
  		}
	}

	addDoc() {
		console.log('Content.addDoc');

		fetch('http://localhost:3000/docs/add', {
  			method: 'POST',
  			headers: {
  				'Accept': 'application/json',
  				'Content-Type': 'application/json'
  			},
  			body: JSON.stringify({ name: this.state.doc.name })
  		})
  		.then((response) => response.json())
  		.then((responseJson) => { 
  			let message = '';
  			if( responseJson.length == 0 ) {
  				message = 'Document added!';
  			}
  			this.setState({ 
  				doc: {_id: responseJson._id, name: responseJson.name},
			  	message: message
	    	});
  		})
  		.catch( (error) => { 
  			this.message = error;
  			console.error(error); 
  		});
	}

	update() {
		console.log('Content.update');

		fetch('http://localhost:3000/docs/update', {
  			method: 'PUT',
  			headers: {
  				'Accept': 'application/json',
  				'Content-Type': 'application/json'
  			},
  			body: JSON.stringify({ _id: this.state.doc._id, name: this.state.doc.name })
  		})
  		.then((response) => response.json())
  		.then((responseJson) => { 
  			let message = '';
  			if( responseJson.length == 0 ) {
  				message = 'No document found!';
  			}
  			this.setState({ 
			  	doc: {_id: responseJson._id, name: responseJson.name},
			  	message: message
	    	});
  		})
  		.catch( (error) => { 
  			this.message = error;
  			console.error(error); 
  		});
	}

	clean() {
		this.setState({ 
    		docs: this.state.docs,
		  	doc: {
		  		_id: '',
		  		name: ''
		  	},
		  	pagination: this.state.pagination,
		  	message: ''
    	});
	}

	list(page) {
		console.log('Content.list = '+ page);
		fetch('http://localhost:3000/docs/list/'+1)
  		.then((response) => response.json())
  		.then((responseJson) => { 
  			let message = '';
  			if( responseJson.length == 0 ) {
  				message = 'No document found!';
  			}
  			this.setState({ 
	    		docs: responseJson.docs,
			  	doc: this.state.doc,
			  	pagination: responseJson,
			  	message: message
	    	});
  		})
  		.catch( (error) => { 
  			this.message = error;
  			console.error(error); 
  		});
	}

	saySomething(something) {
        console.log(something);
    }

    handleClick(e) {
        this.saySomething("element clicked");
    }

    handleChangeId(event) {
    	var _doc = this.state.doc;
    	_doc._id = event.target.value;
    	this.setState({ 
		  	doc: _doc
    	});
    }

    handleChangeName(event) {
    	var _doc = this.state.doc;
    	_doc.name = event.target.value;
    	this.setState({ 
		  	doc: _doc
    	});
    }

    componentDidMount() {
        this.saySomething("component did mount");
    }

	render() {

		const listDocs = this.state.docs.map((item) =>
		    <Item 
		    	name={item.name} 
		    	_id={item._id} 
		    	onDocEdit={() => this.find(item._id)}
		    	onDocRemove={() => this.remove(item._id)} />
		);

		return (
			<div class='container'>
				
				<div class='jumbotron'>
					<div class='input-group'>
						<input class='form-control' name='_id' placeholder='Id' value={this.state._id} onChange={this.handleChangeId} disabled />
					</div>
					<div class='input-group'>
						<input class='form-control' name='name' placeholder='Name' value={this.state.name} onChange={this.handleChangeName} />
					</div>
					<div class='btn-group'>
						<button class='btn btn-primary' onClick={this.clean.bind(this)}>New</button>
						<button class='btn btn-primary' onClick={this.addOrUpdate.bind(this)}>Add or Update</button>
						<button class='btn btn-primary' onClick={this.list.bind(this)}>List</button>
					</div>
				</div>

				<div class="row marketing">
					{listDocs}
				</div>

			</div>
			);
	}
}