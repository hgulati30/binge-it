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
    
export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      popular: [],
      categories: [],
      list: []
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
    const res1 = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=626cac06b27464e10c415ae8f95a1d12');
    const { status: status1, data: data1 } = res1;
    if (status1 === 200) {
      this.setState({
        categories: data1.genres.splice(0, 10) || []
      })
    }
    /**
     * discover movies by genre
     */
    const res2 = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=626cac06b27464e10c415ae8f95a1d12&with_genres=28`);
    const { status: status2, data: data2 } = res2;
    if (status2 === 200) {
      this.setState({
        list: data2.results || []
      })
    }
  }

  render() {
    const { popular, categories, list } = this.state;
    return (
      <div>
        {/*<div className="trending">
          <h1>Recommend</h1>
          <div className="wrap">
            {popular.map((item, index) => (
              <Link to={`/detail/${item.id}`}>
                <div className="card" style={{ width: '18rem', marginTop: '20px' }} key={index}>
                  <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{ item.title }</h5>
                    <p className="card-text">{ item.overview }</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
            </div>*/}
        <div className="category wrap" style={{marginTop: '20px', marginBottom: '30px'}}>
          {categories.map((item, index) => (
            <button type="button" className="btn btn-primary" key={index} onClick={async () => {
              const res2 = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=626cac06b27464e10c415ae8f95a1d12&with_genres=${item.id}`);
              const { status: status2, data: data2 } = res2;
              if (status2 === 200) {
                this.setState({
                  list: data2.results || []
                })
              }
            }}>
              { item.name }
            </button>
          ))}
        </div>
        <div className="list">
          <div className="wrap">
            {list.map((item, index) => (
              <Link to={`/detail/${item.id}`} style={{ textDecoration: 'none' }}>
              <div className="card text-center" style={{ width: '20rem', marginTop: '20px' }} css={card} key={index}>
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
      </div>
    )
  }
}