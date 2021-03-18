import React from "react";
import axios from 'axios';
import { withRouter } from "react-router";
/** @jsxImportSource @emotion/react */
// import React from 'react';
import { css } from '@emotion/react';

const banner = css`
  background-size: cover;
`;

const card = css`
  width: 14rem;
  marginTop: 20px;
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  text-align: center;

  &:hover {
      background-color: lightgray;
      transform: scale(1.05);
  }
`;

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {}
    }
  }

  async componentDidMount() {
    /**
     * get params by routes
     */
    const id = this.props.match.params.id;
    /**
     * get movie detail
     */
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=626cac06b27464e10c415ae8f95a1d12`);
    const { status, data } = res;
    console.log(data)
    if (status === 200) {
      this.setState({
        detail: data
      })
    }
  }

  render() {
    const { detail } = this.state;
    return (
      <div>
        {/**
         * Banner with image and title
         */}
        <div className="banner" style={{color: 'white', height: '150px', backgroundSize: 'cover', background: `url('https://image.tmdb.org/t/p/w500/${detail.backdrop_path}') center`, backgroundSize: 'cover'}}>
          <h1 style={{marginLeft: '20px', paddingTop: '50px'}}>{ detail.original_title }</h1>
        </div>
        {/**
         * Imdb & vote
         */}
         <div className="container" style={{ marginTop: '20px' }}>
            <div className='card text-center' style={{backgroundColor: detail.vote_average > 7.0 ? 'green' : detail.vote_average < 5.0 ? 'red' : 'yellow'}} css={card}>
              <h4> Average Rating </h4>
              <h1 style={{paddingTop: '40px'}}> { detail.vote_average } </h1>
              <h6 style={{paddingTop: '30px'}}> Vote Count: { detail.vote_count } </h6>
            </div>

          </div>
    
        {/**
         * Overview
         */}
        <p className="container" style={{ marginTop: '50px'}}>
          <h3>Overview</h3>
          {detail.overview}
        </p>

        {/**
         * Release Date
         */}
        <div className="container" style={{ marginTop: '40px'}}>
          <h3>Release Date</h3>
          <p>{detail.release_date}</p>
        </div>
        
        {/**
         * genres
         */}
        <div className="wrap" style={{justifyContent: 'start', marginTop: "40px"}}>
          <h3 style={{marginRight: '20px', marginLeft: '12px'}}>Genres: </h3>
          {(detail.genres || []).map((item, index) => (
            <button type="button" className="btn btn-warning" style={{marginRight: '10px'}} key={index}>
              { item.name }
            </button>
          ))}
        </div>

        {/**
         * Production Company
         */}
        <div className="container" style={{ marginTop: '40px'}}>
          <h3>Production Company</h3>
          <div className="wrap" style={{justifyContent: 'start', margin: '30px 0px'}}>
            {(detail.production_companies || []).map((item, index) => (
              <img src={`https://image.tmdb.org/t/p/h30/${item.logo_path}`} style={{marginRight: '25px'}} key={index}/>
            ))}
          </div>
        </div>

        {/**
         * Production Country
         */}
        <div className="container" style={{ marginTop: '40px', marginBottom: '100px'}}>
          <h3>Production Country</h3>
          <div className="wrap" style={{justifyContent: 'start'}}>
            {(detail.production_countries || []).map((item, index) => (
              <p key={index}>
                { item.name }
              </p>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Detail)
