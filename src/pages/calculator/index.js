import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
/** @jsxImportSource @emotion/react */
// import React from 'react';
import { css } from '@emotion/react';

const card = css`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    text-align: center;
    margin: 10px 5px;

    &:hover {
        background-color: lightgray;
        transform: scale(1.05);
    }
    `;

export default class Calculator extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			popular: [],
			categories: [],
			list: [],
			display: 0,
			searchResult: [],
			selectedCategory: 28,
			hrs: 2,
		}
	}
	async componentDidMount() {
		/**
		 * Popular for recommand
		 */
		const res = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=626cac06b27464e10c415ae8f95a1d12');
		const { status, data } = res;
		if (status === 200) {
			this.setState({
			popular: data.results.splice(0, 3) || []
			})
		}
		/**
		 * get some movies genre
		 */
		const res1 = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=626cac06b27464e10c415ae8f95a1d12&language=en-US');
		const { status: status1, data: data1 } = res1;
		if (status1 === 200) {
			this.setState({
			categories: data1.genres.splice(0, 10) || []
			})
		}

		/**
		 * Search Movies
		 */
		const res2 = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=626cac06b27464e10c415ae8f95a1d12`)
		const { status: status2, data: data2 } = res2;
		if (status2 === 200) {
			this.setState({
				searchResult: data2.results || []
			})
		}
	}

	setHrs = (amt) => {
		const newHrs = amt;
		this.setState({
			hrs: newHrs
		});
	}
	

	render() {
		const { popular, categories, list, display, searchResult, selectedCategory, hrs } = this.state;

		return (
		<div>
			<div className="trending">
				<h1>Calculator</h1>
				<div>
					<span>Hours to Binge: </span><input id="hrsInp" type="text" defaultValue="2" onChange={event => this.setHrs(event.target.value)}/>
				</div>
				<div className="wrap" style={{marginTop: '20px'}}>
					Select a Category:
					{categories.map((item, index) => (
						<button id={"btnID"+index} type="button" className={"btn btn-calculator"} key={index} onClick={async () => {
							const res1 = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=626cac06b27464e10c415ae8f95a1d12&language=en-US`);
							const { status: status1, data: data1 } = res1;
							if (status1 === 200) {
								this.setState({
									list: data1.results || [],
									selectedCategory: item.id
								})
							}
						}}>
						{ item.name }
						</button>
					))}
				</div>
				<div>
					{
						<button type="button" className="btn btn-calculator" onClick={async () => {
							let query = 'https://api.themoviedb.org/3/discover/movie?api_key=626cac06b27464e10c415ae8f95a1d12&with_genres='+this.state.selectedCategory;
							const res2 = await axios.get(query);
							const { status: status2, data: data2 } = res2;
							if (status2 === 200) {
								let sResComps = [];
								console.log(document.getElementById("hrsInp"));
								console.log("hrs: ", hrs);
								console.log("typeof hrs: ", typeof hrs);
								let totalDataMinutes = 0;
								for(var i = 0; i < data2.results.length; i++){
									let item = data2.results[i];
									
									let query2 = 'https://api.themoviedb.org/3/movie/' + data2.results[i].id + '?api_key=626cac06b27464e10c415ae8f95a1d12';
									const res10 = await axios.get(query2);
									const { status: status10, data: data10 } = res10;
									if(status10 === 200 && typeof data10.runtime === 'number'){
										if(hrs * 60 < totalDataMinutes + data10.runtime){
											break;
										}
										totalDataMinutes += data10.runtime;
										sResComps.push(
										<div className="card" style={{ width: '20rem', marginTop: '20px' }} css={card} key={i}>
											<img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} className="card-img-top" alt="..." />
											<div className="card-body text-dark">
											  <h5 className="card-title">{ item.title }</h5>
											  <p className="card-text">{ item.overview }</p>
											</div>
										  </div>
										);
									}
								}
								this.setState({
									searchResult: sResComps,
									display: 1
								});
							}
						}}>
						Submit Query
						</button>
					}
				</div>
				{ 
					this.state.display
					? (<div className="list">
						<h1>Results</h1>
						<div className="wrap">
							{searchResult}
						</div>
					</div>)
					: <div/>
				}
				
			</div>
		</div>
		);
	}
}