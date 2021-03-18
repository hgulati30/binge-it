import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import axios from 'axios';
import './App.css'

import Home from './pages/home'
import Upcoming from './pages/upcoming'
import Top from './pages/top'
import Detail from './pages/detail'
import Results from './pages/results'
import logo from './movie_icon.png';


import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap'


/**
 * Route Config
 */
const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/by-catagory",
    component: Home
  },
  {
    path: "/top",
    component: Top
  },
  {
    path: "/upcoming",
    component: Upcoming
  },
  {
    path: "/detail/:id",
    component: Detail
  },
  {
    path: "/results/:keyword",
    component: Results
  }
];

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      keyword: '',
      showNavigation: false,
      showUserMenu: false,
    }
  }

  /**
   * Will need redirect public network
   */
  async componentDidMount() {
    // Step 1: Create a request token

    // Step 2: Ask the user for permission

    // Step 3: Create a session ID
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar bg="dark" variant="dark" sticky="top">
            {/*<Navbar.Brand href="#home">Navbar</Navbar.Brand>*/}
            <Navbar.Brand >
              <Link to="/">
                <img width="100px" height="50px" className="img-responsive" src={logo}  alt="logo" />
               
              </Link>
            </Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/by-catagory">By Catagory</Nav.Link>
              <Nav.Link href="/top">Top Rated</Nav.Link>
              <Nav.Link href="/upcoming">Upcoming</Nav.Link>
            </Nav>
            <form className="navbar-nav">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => {
                this.setState({
                  keyword: e.target.value
                })
              }}/>
              <a className="btn btn-outline-success my-2 my-sm-0" href={`/results/${this.state.keyword}`}>Search</a>
            </form>
          </Navbar>

          <div className="container">
            {/*
              Render Route by Config above
             */}
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              ))}
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
