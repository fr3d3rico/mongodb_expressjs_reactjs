import React from 'react';
import ReactDOM from 'react-dom';

import Content from './Content';
import Header from './Header';
import Footer from './Footer';

class App extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<Content />
				<Footer />
			</div>
			);
	}
}

ReactDOM.render(
	<App titleContent='Fred' />,
	document.getElementById('app')
);