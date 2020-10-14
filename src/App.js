import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Home from './components/Home/'
import WorkOrders from './components/WorkOrders/'
import About from './components/About/'
import Dashboard from './components/Dashboard/'
import './App.css'

export default function App() {
  return (
    <Router>
      <div>
        <ul className="header-nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/work-orders">Work Orders</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>

        <hr />
        
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/work-orders">
            <WorkOrders />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}