import React from 'react';
import './App.css';
import '../src/styles/styles.css';
import Home from './components/Home'
import BlogPage from './components/BlogPage';
import {
  BrowserRouter as Router,
  Redirect,

} from "react-router-dom";
import Route from "react-router-dom/Route";

function App() {
  return (
    <div className="App">
        <Router>
      {/* routing to specific pages in react using router */}
    <Redirect to exact component={Home}/> 
    <Route exact path="/" component={Home}/>
    <Route path="/Blogpage" exact component={BlogPage} />
    </Router>
    </div>
  );
}

export default App;
