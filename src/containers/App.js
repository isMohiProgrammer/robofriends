import React from 'react';
import CardList from '../components/CardList.js';
import SearchBox from  '../components/SearchBox'
import './App.css';
import Scroll from  '../components/Scroll.js'
import ErrorBoundry from '../components/ErrorBoundry.js'


class App extends React.Component {
	constructor() {
		super();
		this.state = {
			robots : [],
			Searchfield : ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => this.setState({robots:users}))
	}

	onSearchChange=(event) => {
		this.setState({Searchfield: event.target.value})
	}

	render() {
			const filteredRobot = this.state.robots.filter(robots => {
				return robots.name.toLowerCase().includes(this.state.Searchfield.toLowerCase());
			})
			if (this.state.robots.length === 0){
				return <h1>loading...</h1>
			} else {
				return (
					<div className='tc'>
						<h1 className='f1'>robo friends</h1>
						<SearchBox searchChange={this.onSearchChange}/>
						<Scroll>
							<ErrorBoundry>
								<CardList robots = {filteredRobot}/>
							</ErrorBoundry>
						</Scroll>
					</div>
				);
			}	
			}
}

export default App;