import React from "react";
import axios from 'axios';
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class Results extends React.Component {

  constructor() {
    super();
    this.state = {
      list: [],
    }
  }

  async componentDidMount() {
    const keyword = this.props.match.params.keyword;
    const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=626cac06b27464e10c415ae8f95a1d12&query=${keyword}`);
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
        <h1>Search Results</h1>
        <div className="wrap">
          {list.map((item, index) => (
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
      </div>
    )
  }
}

export default withRouter(Results)
