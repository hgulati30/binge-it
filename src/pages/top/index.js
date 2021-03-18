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
        text-decoration: none;
    }
    `;

export default class Top extends React.Component {
  constructor(){
    super();
    this.state = {
      list: []
    }
  }

  async componentDidMount() {
    const res = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=626cac06b27464e10c415ae8f95a1d12');
    const { status, data } = res;
    if (status === 200) {
      this.setState({
        list: data.results
      })
    }
  }
  render() {
    const { list } = this.state;
    return (
      <div className="container">
        <h1>Top Rated</h1>
        <div className="wrap">
          {list.map(item => (
            <Link to={`/detail/${item.id}`}>
            <div className="card text-center" style={{ width: '20rem', marginTop: '20px' }} css={card}>
              <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} className="card-img-top" alt="..." />
              <div className="card-body text-dark">
                <h5 className="card-title">{ item.title }</h5>
                <p className="card-text">{ item.overview }</p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }
}