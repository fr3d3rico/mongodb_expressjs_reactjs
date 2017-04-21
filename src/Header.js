import React from 'react';

export default class Header extends React.Component {
	render() {
		return (
			<div class='header clearfix'>
				<nav>
					<ul class='nav nav-pills pull-right'>
						<li role='presentation' class='active'><a href='#'>Home</a></li>
						<li role='presentation'><a href='#'>About</a></li>
						<li role='presentation'><a href='#'>Contact</a></li>
					</ul>
				</nav>
				<h3 class='text-muted'>MongoDB + ExpressJS + ReactJS</h3>
			</div>
			);
	}
}